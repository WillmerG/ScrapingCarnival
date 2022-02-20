const puppeteer = require('puppeteer');
const pageCarnival = require('./page/pageCarnival');
const website = require('./setting/website.json');

(async () => {
  console.time('Tiempo');

  console.log('Creando Browser');
  const browser = await puppeteer.launch();

  console.log('Creando Page');
  const page = await browser.newPage();

  console.log('inicio de pageCarnival');
  await pageCarnival(page, website);
  console.log('fin de pageCarnival');

  console.log('Cerrando Page');
  await page.close();

  console.log('Cerrando Browser');
  await browser.close();

  console.timeEnd('Tiempo');
})();
