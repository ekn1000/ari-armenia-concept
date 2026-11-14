const { test, expect } = require("@playwright/test");
const fs = require("node:fs");

test("without JavaScript the fallback form cannot submit personal data", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4187/");
  await expect(page.locator("#offer-form")).toHaveAttribute("inert", "");
  await expect(page.locator('[type="submit"]')).toBeDisabled();
  await context.close();
});

const validDates = () => {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  const format = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const arrival = format(date);
  date.setDate(date.getDate() + 4);
  return { arrival, departure: format(date) };
};

async function fillRequest(page, support = "companion") {
  const dates = validDates();
  await page.locator("#request-name").fill("Alex <img src=x onerror=alert(1)>");
  await page.locator("#arrival").fill(dates.arrival);
  await page.locator("#departure").fill(dates.departure);
  await page.locator("#travellers").fill("3");
  await page.locator("#support-type").selectOption(support);
  if (support === "companion")
    await page.locator("#companion-time").fill("2 days, 3 hours each");
  await page
    .locator("#request-needs")
    .fill("Coffee & culture <script>alert(1)</script>");
  return dates;
}

for (const lang of ["hy", "ru", "en"]) {
  test(`${lang}: translated service concept, filters, enquiry and no fixed prices`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/?lang=${lang}#plan`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    const audit = await page.evaluate(() => {
      const t = window.ARI_TRANSLATIONS[document.documentElement.lang];
      const dictionaryKeys = Object.keys(window.ARI_TRANSLATIONS.hy).sort();
      return {
        missing: [
          ...document.querySelectorAll(
            "[data-t],[data-html],[data-placeholder],[data-alt]",
          ),
        ].filter(
          (el) =>
            !t[
              el.dataset.t ||
                el.dataset.html ||
                el.dataset.placeholder ||
                el.dataset.alt
            ],
        ).length,
        keysMatch:
          JSON.stringify(dictionaryKeys) ===
          JSON.stringify(Object.keys(t).sort()),
        content: document.body.innerText,
        title: document.title,
        support: document.querySelector("#support-categories").children.length,
      };
    });
    expect(audit.missing).toBe(0);
    expect(audit.keysMatch).toBe(true);
    expect(audit.title).not.toContain("undefined");
    expect(audit.support).toBe(5);
    expect(audit.content).not.toMatch(/[€$£֏₽]\s*\d|\d\s*[€$£֏₽]/);
    await expect(page.locator("#faq-list details")).toHaveCount(8);
    await expect(page.locator(".steps li")).toHaveCount(3);
    await expect(page.locator("#channel-links")).toBeHidden();
    await page.locator('[data-filter="culture"]').click();
    await expect(page.locator(".experience-card")).toHaveCount(1);
    await page.locator('[data-card="culture"]').click();
    await expect(page.locator("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("dialog")).not.toBeVisible();
    await fillRequest(page);
    await page.locator('[type="submit"]').click();
    await expect(page.locator("dialog")).toBeVisible();
    const text = await page.locator("#request-preview").inputValue();
    expect(text).toContain("Alex <img");
    expect(text).toContain("2 days, 3 hours each");
    expect(text).toContain("Coffee & culture <script>");
    await expect(page.locator("#dialog-body img")).toHaveCount(0);
    await expect(page.locator(".messenger-link")).toHaveCount(0);
    if (lang === "en") {
      await page
        .context()
        .grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.locator("[data-copy]").click();
      await expect
        .poll(async () =>
          (await page.evaluate(() => navigator.clipboard.readText())).replace(
            /\r\n/g,
            "\n",
          ),
        )
        .toBe(text);
    }
    const downloadPromise = page.waitForEvent("download");
    await page.locator("[data-download]").click();
    const download = await downloadPromise;
    const file = await download.path();
    expect(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "")).toBe(text);
    expect(download.suggestedFilename()).toContain(lang + ".txt");
    expect(errors).toEqual([]);
  });
}

test("dates, counts and required fields reject invalid requests", async ({
  page,
}) => {
  await page.goto("/?lang=en");
  await page.locator('[type="submit"]').click();
  await expect(page.locator("dialog")).not.toBeVisible();
  const { arrival } = await fillRequest(page, "online");
  await expect(page.locator("#companion-field")).toBeHidden();
  await page.locator("#departure").fill("2020-01-01");
  await page.locator('[type="submit"]').click();
  await expect(page.locator("dialog")).not.toBeVisible();
  expect(
    await page
      .locator("#departure")
      .evaluate((el) => el.validity.rangeUnderflow),
  ).toBe(true);
  await page.locator("#departure").fill(arrival);
  await page.locator("#travellers").fill("0");
  await page.locator('[type="submit"]').click();
  await expect(page.locator("dialog")).not.toBeVisible();
  await page.locator("#travellers").fill("1");
  await page.locator('[type="submit"]').click();
  await expect(page.locator("dialog")).toBeVisible();
});

test("language links preserve form input, selection, anchor and saved preference", async ({
  page,
}) => {
  await page.goto("/?lang=ru#plan");
  await fillRequest(page);
  await page.locator('[data-lang="en"]').click();
  await expect(page).toHaveURL(/lang=en#plan$/);
  await expect(page.locator("#request-name")).toHaveValue(
    "Alex <img src=x onerror=alert(1)>",
  );
  await expect(page.locator("#support-type")).toHaveValue("companion");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/?lang=invalid");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("verified contact configuration produces encoded drafts without sending", async ({
  page,
}) => {
  // Test-only destinations; no messenger is opened and no request is sent.
  await page.route("**/site-config.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "window.ARI_CONTACT={whatsapp:'15555550123',telegram:'ari_example'};",
    }),
  );
  await page.goto("/?lang=en");
  await expect(page.locator("#channel-links a")).toHaveCount(2);
  await fillRequest(page);
  await page.locator('[type="submit"]').click();
  const message = await page.locator("#request-preview").inputValue();
  for (const [channel, host] of [
    ["whatsapp", "wa.me"],
    ["telegram", "t.me"],
  ]) {
    const link = page.locator(`[data-channel="${channel}"]`);
    const url = new URL(await link.getAttribute("href"));
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe(host);
    expect(url.searchParams.get("text")).toBe(message);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const persisted = await page.evaluate(() =>
    JSON.stringify({ ...localStorage }),
  );
  expect(persisted).not.toContain("Alex");
  expect(page.url()).not.toContain("Alex");
});

test("invalid messenger configuration never becomes a link", async ({
  page,
}) => {
  await page.route("**/site-config.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: "window.ARI_CONTACT={whatsapp:'javascript:alert(1)',telegram:'https://wrong.example'};",
    }),
  );
  await page.goto("/?lang=en");
  await expect(page.locator("#channel-links")).toBeHidden();
  await fillRequest(page);
  await page.locator('[type="submit"]').click();
  await expect(page.locator(".messenger-link")).toHaveCount(0);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ["hy", "ru", "en"]) {
      await page.goto(`/?lang=${lang}`);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        lang + " page overflow",
      ).toBe(true);
      for (const selector of [
        "h1",
        "#services",
        "#pricing",
        "#offer-form",
        ".header-inner",
      ]) {
        const box = await page.locator(selector).boundingBox();
        expect(box.x, lang + " " + selector).toBeGreaterThanOrEqual(-1);
        expect(box.x + box.width, lang + " " + selector).toBeLessThanOrEqual(
          width + 1,
        );
      }
      if (width <= 650) {
        await page.locator(".menu-toggle").click();
        await expect(page.locator("#navigation")).toBeVisible();
        await page.locator("#navigation a").first().click();
        await expect(page.locator(".menu-toggle")).toHaveAttribute(
          "aria-expanded",
          "false",
        );
      }
    }
  });
}

test("photo credits, local assets and in-page destinations exist", async ({
  page,
}) => {
  const failures = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(response.url());
  });
  await page.goto("/?lang=en");
  const anchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  for (const href of anchors.filter((href) => href.length > 1))
    await expect(page.locator(href)).toHaveCount(1);
  await page.locator("#credits-button").click();
  await expect(page.locator(".credits-list>div")).toHaveCount(4);
  expect(failures).toEqual([]);
});
