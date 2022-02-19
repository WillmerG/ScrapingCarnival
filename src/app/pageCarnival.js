const { writeFile } = require('fs');
const path = require('path');

module.exports = async (page, website) => {

  await page.goto(website.url);
  await page.waitForSelector('.container');

  console.log('obteniendo lista de cruceros');
  const cruise = await page.evaluate((select) => {
    const elements = document.querySelectorAll(select.lista);

    const list = [];
    for (const item of elements) {
      list.push({
        cruise: item.querySelector(select.nombreCrucero).innerText,
        url: item.querySelector(select.nombreCrucero).href
      });
    }

    return list;
  }, website.selector);

  await writeFile(path.join(path.resolve(__dirname, '../assets'), `/${website.name}.json`), JSON.stringify(cruise), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Datos Generados');
  });
};
