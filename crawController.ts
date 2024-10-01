import { Browser } from "puppeteer-core";
import crawServices from "./crawServices";
import { writeJsonFile } from "./utils";

// const tgdd = {
//    dtdd: "https://www.thegioididong.com/dtdd#c=42&o=13&pi=1",
//    laptop: "https://www.thegioididong.com/laptop#c=44&o=9&pi=2",
// };

const CrawController = async (browser: Browser) => {
   try {
      if (!browser) return;

      const products = await crawServices.crawProduct(browser, "mobile");

      browser.close();

      writeJsonFile(products, "products");
   } catch (error) {
      console.log(error);
      browser?.close();
      console.log(">>> loi browser controller");
   }
};

export default CrawController;
