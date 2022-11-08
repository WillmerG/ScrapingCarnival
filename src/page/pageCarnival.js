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
    const list = {
      cruises: [],
      sailFrom: [],
      sailTo: [],
      duration: []
    };
    for (const item of document.querySelectorAll(select.cruises.lista)) {

      const listDatos = [];
      for (const itemD of item.querySelectorAll(select.cruises.listDatosCrucero.selector)) {
        listDatos.push({
          strong: itemD.querySelector(select.cruises.listDatosCrucero.title).innerText,
          link: {
            text: itemD.querySelector(select.cruises.listDatosCrucero.link).innerText,
            href: itemD.querySelector(select.cruises.listDatosCrucero.link).href
          }
        });
      }

      let imagen1 = item.querySelector(select.cruises.img1);
      let imagen2 = imagen1 ? item.querySelector(select.cruises.img2A) : item.querySelector(select.cruises.img2B);

      list.cruises.push({
        cruise: item.querySelector(select.cruises.nombreCrucero).innerText,
        url: item.querySelector(select.cruises.nombreCrucero).href,
        img1: imagen1 ? imagen1.src : null,
        img2: imagen2 ? imagen2.src : null,
        datos: listDatos
      });
    }

    for (const key in select.filter) {
      for (const item of document.querySelectorAll(select.filter[key])) {
        list[key].push(item.querySelector('label').innerText);
      }
    }

    return list;
  }, website.selector);
  console.timeEnd('TiempoPageCarnival');

  await exportJSON(path.join(path.resolve(__dirname, '../data'), `/${website.nameFile}`), JSON.stringify(cruise));
};
