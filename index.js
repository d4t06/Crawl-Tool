const scrawController = require("./crawController");

const puppeteer = require("puppeteer");

const start = async () => {
   let browser;
   try {
      browser = await puppeteer.launch({
         headless: true,
      });
      if (browser) console.log(">>> browser open");

      scrawController(browser);
   } catch (error) {
      console.log(">>> open browser error", error);
   }
   return browser;
};

start();
