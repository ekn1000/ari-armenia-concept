// Submit public, new/changed site URLs only. Never run as part of normal tests.
const fs = require("node:fs");
const path = require("node:path");
const { DOMParser } = require("linkedom");
const seo = require("../seo.js");

async function main() {
  const root = path.resolve(__dirname, "..");
  const files = fs
    .readdirSync(root)
    .filter((name) => /^[a-f0-9]{32}\.txt$/.test(name));
  if (files.length !== 1)
    throw new Error("Expected one public IndexNow ownership file.");
  const key = fs.readFileSync(path.join(root, files[0]), "utf8").trim();
  if (key !== files[0].slice(0, -4))
    throw new Error("IndexNow ownership file does not match its name.");
  const keyLocation = new URL(files[0], seo.baseUrl).href;
  const verification = await fetch(keyLocation, {
    signal: AbortSignal.timeout(30000),
  });
  if (!verification.ok || (await verification.text()).trim() !== key)
    throw new Error(
      "Publish and verify the ownership file before submitting URLs.",
    );
  const sitemap = new DOMParser().parseFromString(
    fs.readFileSync(path.join(root, "sitemap.xml"), "utf8"),
    "application/xml",
  );
  const canonical = [...sitemap.getElementsByTagName("loc")].map(
    (node) => node.textContent,
  );
  const requested = process.argv.slice(2);
  const urlList = requested.length
    ? requested.map((url) => new URL(url, seo.baseUrl).href)
    : canonical;
  const base = new URL(seo.baseUrl);
  if (
    !urlList.length ||
    urlList.some(
      (url) => new URL(url).origin !== base.origin || !canonical.includes(url),
    )
  )
    throw new Error("Submit only this site's canonical sitemap URLs.");
  const endpoint = "https://yandex.com/indexnow";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: base.hostname, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  const report = {
    engine: "Yandex",
    endpoint,
    submittedAt: new Date().toISOString(),
    status: response.status,
    accepted: response.status === 200 || response.status === 202,
    pendingKeyValidation: response.status === 202,
    urlCount: urlList.length,
    urls: urlList,
  };
  fs.mkdirSync(path.join(root, "qa"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "qa/yandex-indexnow-submission.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report));
  if (!report.accepted)
    throw new Error(
      "Yandex did not accept the IndexNow request (HTTP " +
        response.status +
        ").",
    );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
