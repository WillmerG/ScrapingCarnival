const scraperObject = {
  url: 'https://www.carnival.com/cruise-ships.aspx',
  async scraper(browser) {
    let page = await browser.newPage();
    console.log('page: ', this.url);
    await page.goto(this.url);

    await page.waitForSelector('.container');

    const cruise = await page.evaluate(() => {
      const elements = document.querySelectorAll('.container .ship-result');

      const list = [];
      for (const item of elements) {
        list.push({
          cruise: item.querySelector('.text h2 a').innerText,
          url: item.querySelector('.text h2 a').href
        })
      }

      return list;
    });

    console.log('Datos list: ', list);
  }
}

module.exports = scraperObject;
