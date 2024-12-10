import puppeteer, { executablePath } from "puppeteer-core";
import CrawController from "./crawController";

const start = async () => {
   try {
      const browser = await puppeteer.launch({
         headless: false,
         browser: "firefox",
         extraPrefsFirefox: {},
         executablePath: "/opt/firefox/firefox",
         devtools: true,
      });
      if (browser) console.log(">>> browser open");

      await CrawController(browser);
   } catch (error) {
      console.log(">>> open browser error", error);
   }
};

start();
