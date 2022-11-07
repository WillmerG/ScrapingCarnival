const path = require('path');
const exportJSON = require('../utils/exportJSON');

module.exports = async (page, website) => {

  console.log('navegar a ', website.url);
  await page.goto(website.url, { waitUntil: 'load', timeout: 0 });
  console.log('waitForSelector');
  await page.waitForSelector(website.waitSelector);

  console.log('obteniendo lista de cruceros');
  console.time('TiempoPageCarnival');
  const cruise = await page.evaluate((select) => {
    const list = [];
    for (const item of document.querySelectorAll(select.lista)) {

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

      let imagen1 = item.querySelector(select.img1);
      let imagen2 = imagen1 ? item.querySelector(select.img2A) : item.querySelector(select.img2B);

      list.push({
        cruise: item.querySelector(select.nombreCrucero).innerText,
        url: item.querySelector(select.nombreCrucero).href,
        img1: imagen1 ? imagen1.src : null,
        img2: imagen2 ? imagen2.src : null,
        datos: listDatos
      });
    }

    return list;
  }, website.selector);
  console.timeEnd('TiempoPageCarnival');

  await exportJSON(path.join(path.resolve(__dirname, '../data'), `/${website.nameFile}`), JSON.stringify(cruise));
};
