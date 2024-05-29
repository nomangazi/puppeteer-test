const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1080,768"],
  });
  const page = await browser.newPage();

  await page.goto("https://www.google.com");
  await page.click("textarea.gLFyf");
  await page.type("textarea.gLFyf", "puppeteer");
  await page.keyboard.press("Enter");

  await page.waitForSelector(".g");
  const links = await page.evaluate(() => {
    let linkAr = [];
    const anchors = Array.from(document.querySelectorAll(".g"));
    anchors.forEach((item) => {
      const title = item.querySelector("h3").textContent;
      const url = item.querySelector("a").href;
      linkAr.push({ title, url });
    });
    return linkAr;
  });
  console.log(links);
  await browser.close();
})();
