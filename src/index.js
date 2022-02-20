const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('./setting/website.json');

(async () => {
  console.time('Tiempo');

  console.log('Creando Browser');
  const browser = await puppeteer.launch();

  console.log('Creando Page');
  const page = await browser.newPage();

  for (const website of websites) {
    const dirFile = path.join(__dirname, 'app', website.app);
    await require(dirFile)(page, website);
  }

  console.log('Cerrando Page');
  await page.close();

  console.log('Cerrando Browser');
  await browser.close();

  console.timeEnd('Tiempo');
})();
