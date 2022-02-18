const browserObject = require('./app/browser');


const puppeteer = require('puppeteer');
const { writeFile } = require('fs');

function generaNombre(str) {
  return str.trim().toLowerCase().
    replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))).replace(' '/g, '')
    .replace(':'/g,'').charAt(0).toLowerCase();
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.carnival.com/cruise-ships.aspx');


  console.time('Corrida');

  await page.waitForSelector('.container');

  const cruise = await page.evaluate(() => {
    const elements = document.querySelectorAll('.container .ship-result');

    const list = [];
    for (const item of elements) {

      // let itemCruise = {
      //   cruise: item.querySelector('.text h2 a').innerText,
      //   url: item.querySelector('.text h2 a').href
      // };

      // const list2 = item.querySelectorAll('.text ul li');
      // for (const item2 of list2) {
      //   itemCruise[`datos`] = {
      //     // name: item2.querySelector('a').innerText,
      //     url: item2.querySelector('a').href,
      //   };
      // }

      list.push({
        cruise: item.querySelector('.text h2 a').innerText,
        url: item.querySelector('.text h2 a').href
      });
      // await page.goto(item.href);
    }

    return list;
  });

  await writeFile('./src/assets/datos.json', JSON.stringify(cruise), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Datos Generados');
  });

  await browser.close();

  console.log('Fin del proceso');
  console.timeEnd('Corrida');
})();
