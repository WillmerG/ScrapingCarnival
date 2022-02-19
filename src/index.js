const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('./setting/website.json');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('inicio', __dirname);
  for (const website of websites) {
    const dirFile = path.join(__dirname, 'app', website.app);
    await require(dirFile)(page, website);
  }

  await page.close();
  await browser.close();
})();
