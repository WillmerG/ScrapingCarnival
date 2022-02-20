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

      const listDatos = [];
      for (const itemD of item.querySelectorAll(select.listDatosCrucero.selector)) {
        listDatos.push({
          strong: itemD.querySelector(select.listDatosCrucero.title).innerText,
          link: {
            text: itemD.querySelector(select.listDatosCrucero.link).innerText,
            href: itemD.querySelector(select.listDatosCrucero.link).href
          }
        });
      }

      list.push({
        cruise: item.querySelector(select.nombreCrucero).innerText,
        url: item.querySelector(select.nombreCrucero).href,
        datos: listDatos
      });
    }

    return list;
  }, website.selector);

  await exportJSON(path.join(path.resolve(__dirname, '../assets'), `/${website.name}.json`), JSON.stringify(cruise));
};
