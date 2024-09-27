import { Browser } from "puppeteer";
import crawServices from "./crawServices";

// const mobiles = require("./mobile.json");
// const FPTcrawServices = require("./fptCrawServices");
// const laptops = require("./laptop.json");

// const tgdd = {
//    dtdd: "https://www.thegioididong.com/dtdd#c=42&o=13&pi=1",
//    laptop: "https://www.thegioididong.com/laptop#c=44&o=9&pi=2",
// };

const CrawController = async (browser: Browser) => {
   try {
      if (!browser) return;

      // >>> producst
      // const products = await crawServices.crawProductLinks(
      //    browser,
      //    tgdd["dtdd"]
      // );

      const product = await crawServices.crawProduct(
         browser,
         `https://www.thegioididong.com/dtdd/iphone-16`
      );

      // >>> product detail
      // let i = 0;
      // let productDetails = [];
      // for (let item of laptops) {
      //    if (i >= 20) break;
      //    i++;
      //    const detail = await crawServices.crawProductsDetail(
      //       browser,
      //       `https://www.thegioididong.com/laptop/${item.product_id}`,
      //       item.product_id
      //    );

      //    productDetails.push(detail);
      // }

      browser.close();
      console.log(">>> close browser");

      console.log("check products", product);
   } catch (error) {
      console.log(error);
      browser?.close();
      console.log(">>> loi browser controller");
   }
};

export default CrawController;
