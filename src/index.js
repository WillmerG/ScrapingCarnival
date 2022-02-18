const browserObject = require('./app/browser');
const scraperController = require('./app/pageController');

let browserInstance = browserObject.startBrowser();
scraperController(browserInstance);
