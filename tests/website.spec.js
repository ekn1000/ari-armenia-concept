const { test, expect } = require("@playwright/test");

for (const language of ["hy", "ru", "en"]) {
  test(
    language + ": localized content, direct contacts and experience navigation",
    async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/?lang=" + language + "#plan");
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      const audit = await page.evaluate(() => {
        const t = window.ARMMATE_TRANSLATIONS[document.documentElement.lang];
        return {
          missing: [
            ...document.querySelectorAll(
              "[data-t],[data-html],[data-alt],[data-label]",
            ),
          ].filter(
            (el) =>
              !t[
                el.dataset.t ||
                  el.dataset.html ||
                  el.dataset.alt ||
                  el.dataset.label
              ],
          ).length,
          keysMatch:
            JSON.stringify(
              Object.keys(window.ARMMATE_TRANSLATIONS.hy).sort(),
            ) === JSON.stringify(Object.keys(t).sort()),
          content: document.body.innerText,
        };
      });
      expect(audit.missing).toBe(0);
      expect(audit.keysMatch).toBe(true);
      expect(audit.content).not.toMatch(/[€$£֏₽]\s*\d|\d\s*[€$£֏₽]/);
      await expect(page.locator("form, input, textarea, select")).toHaveCount(
        0,
      );
      await expect(page.locator("#faq-list details")).toHaveCount(8);
      await expect(page.locator(".steps li")).toHaveCount(3);
      await expect(page.locator("#channel-links a")).toHaveCount(3);
      await page.locator('[data-filter="culture"]').click();
      await expect(page.locator(".experience-card")).toHaveCount(1);
      const card = page.locator('[data-card="culture"]');
      await card.click();
      await expect(page.locator("dialog")).toBeVisible();
      await expect(page.locator(".dialog-close")).toBeHidden();
      await page.keyboard.press("Escape");
      await expect(page.locator("dialog")).not.toBeVisible();
      await expect(card).toBeFocused();
      await card.click();
      await page.locator("[data-discuss]").click();
      await expect(page.locator("dialog")).not.toBeVisible();
      await expect(page.locator("#contact-phone")).toBeFocused();
      expect(errors).toEqual([]);
    },
  );
}

test("language switching preserves direct contact destinations and contact anchor", async ({
  page,
}) => {
  await page.goto("/?lang=ru#plan");
  await page.locator('[data-filter="culture"]').click();
  const destinations = await page
    .locator("#channel-links a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  for (const language of ["en", "hy", "ru"]) {
    await page.locator('[data-lang="' + language + '"]').click();
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    expect(new URL(page.url()).hash).toBe("#plan");
    await expect(page.locator(".experience-card")).toHaveCount(1);
    expect(
      await page
        .locator("#channel-links a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
    ).toEqual(destinations);
    await expect(page.locator("#contact-phone")).toHaveAttribute(
      "href",
      "tel:+37491110799",
    );
    await expect(page.locator("form")).toHaveCount(0);
  }
});

test("messenger destinations contain only the owner's number and do not prefill or send messages", async ({
  page,
}) => {
  await page.goto("/en/");
  const expected = {
    whatsapp: "https://wa.me/37491110799",
    telegram: "https://t.me/+37491110799",
    viber: "viber://chat?number=%2B37491110799",
  };
  for (const [channel, destination] of Object.entries(expected)) {
    const link = page.locator('[data-channel="' + channel + '"]');
    await expect(link).toHaveAttribute("href", destination);
    expect(new URL(destination).searchParams.has("text")).toBe(false);
    if (channel !== "viber") {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  }
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
        ".contact-card",
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
