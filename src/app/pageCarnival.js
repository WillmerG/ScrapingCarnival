const path = require('path');
const exportJSON = require('../utils/exportJSON');

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

  await exportJSON(path.join(path.resolve(__dirname, '../assets')), `/${website.name}.json`);
};
