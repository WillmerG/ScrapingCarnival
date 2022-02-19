const { writeFile } = require('fs');
const path = require('path');

module.exports = async (page, website) => {

  await page.goto(website.url);
  await page.waitForSelector('.container');

  const cruise = await page.evaluate(() => {
    const elements = document.querySelectorAll('.container .ship-result');

    const list = [];
    for (const item of elements) {
      list.push({
        cruise: item.querySelector('.text h2 a').innerText,
        url: item.querySelector('.text h2 a').href
      });
    }

    return list;
  });

  console.log('pageCarnival', path.join(path.resolve(__dirname, '../assets'), '/data.json'));
  console.log(cruise);

  await writeFile(path.join(path.resolve(__dirname, '../assets'), '/data.json'), JSON.stringify(cruise), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Datos Generados');
  });
};
