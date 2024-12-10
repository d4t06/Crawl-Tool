import { Browser } from "puppeteer-core";
import crawServices from "./crawServices";
import { writeJsonFile } from "./utils";
import * as appConfig from "./constants/config";

const config = appConfig.baseConfig;

const CrawController = async (browser: Browser) => {
   try {
      if (!browser) return;

      const products = await crawServices.crawProduct(browser, config);
      // const products = await crawServices.crawOneProduct(browser, config, {
      //    image: "",
      //    name: "test",
      //    price: 999,
      //    hasVariant: false,
      //    link: "https://www.thegioididong.com/laptop/acer-aspire-a315-44p-r9w8-r7-nxksjsv002",
      // });

      if (products) writeJsonFile(products, config.name);

      browser.close();
   } catch (error) {
      console.log(error);
      console.log(">>> loi browser controller");
   }
};

export default CrawController;
