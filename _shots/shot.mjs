import puppeteer from "puppeteer-core";
const CHROME = "/home/drc/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const OUT = "/home/drc/Work/Vanya/Websites/ddm/_shots";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

async function prep(theme, locale) {
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.evaluate((t, l) => { localStorage.setItem("ddm-theme", t); localStorage.setItem("ddm-locale", l); }, theme, locale);
}
async function shot(url, name, { w = 1440, h = 900, y = 0 } = {}) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1300));
  if (y) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await new Promise((r) => setTimeout(r, 600)); }
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("shot", name);
}

const B = "http://localhost:3000";
// SQ light
await prep("light", "sq");
await shot(`${B}/`, "hero-light");
await shot(`${B}/`, "manifesto", { y: 950 });
await shot(`${B}/`, "problems", { y: 1700 });
await shot(`${B}/`, "services", { y: 3500 });
await shot(`${B}/`, "trust", { y: 4400 });
await shot(`${B}/`, "process", { y: 5300 });
await shot(`${B}/templates/diagonal`, "preview");
// EN
await prep("light", "en");
await shot(`${B}/`, "hero-en");
await shot(`${B}/`, "services-en", { y: 3500 });
// dark hero
await prep("dark", "sq");
await shot(`${B}/`, "hero-dark");
// mobile small (375)
await prep("light", "sq");
await shot(`${B}/`, "mobile-hero", { w: 375, h: 812 });
await shot(`${B}/`, "mobile-services", { w: 375, h: 812, y: 2600 });
// ultrawide 4k
await shot(`${B}/`, "uw-hero", { w: 3840, h: 1620 });
await browser.close();
console.log("done");
