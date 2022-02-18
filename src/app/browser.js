const puppeteer = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    console.log('Open browser');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true
    });
  }
  catch (err) {
    console.error('Error startBrowser', err)
  }
  return browser;
};

module.exports = {
  startBrowser
};
