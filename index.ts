import puppeteer from "puppeteer-core";
import CrawController from "./crawController";

const start = async () => {
   try {
      const browser = await puppeteer.launch({
         headless: false,
         browser: "firefox",
         extraPrefsFirefox: {},
         dumpio: true,
         executablePath: "/opt/firefox/firefox",
      });
      if (browser) console.log(">>> browser open");

      await CrawController(browser);
   } catch (error) {
      console.log(">>> open browser error", error);
   }
};

start();
