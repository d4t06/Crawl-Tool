import CrawController from "./crawController";
import puppeteer from "puppeteer";

const start = async () => {
   try {
      const browser = await puppeteer.launch({
         headless: false,
      });
      if (browser) console.log(">>> browser open");

      await CrawController(browser);
   } catch (error) {
      console.log(">>> open browser error", error);
   }
};

start();
