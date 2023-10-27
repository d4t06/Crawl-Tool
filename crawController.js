const fs = require("fs");
const crawServices = require("./crawServices");
const mobiles = require("./mobile.json");
const FPTcrawServices = require("./fptCrawServices");
const laptops = require("./laptop.json");

const tgdd = {
   dtdd: "https://www.thegioididong.com/dtdd#c=42&o=17&pi=2",
   laptop: "https://www.thegioididong.com/laptop#c=44&o=9&pi=2",
};
const fpt = "https://fptshop.com.vn/may-tinh-xach-tay";

const scrawController = async (browserInstance) => {
   try {
      const browser = await browserInstance;
      if (!browser) return;

      // >>> producst
      // const products = await crawServices.crawProduct(browser, tgdd["laptop"]);

      // >>> product detail
      let i = 0;
      let productDetails = [];
      for (let item of laptops) {
         if (i >= 20) break;
         i++;
         const detail = await crawServices.crawProductsDetail(
            browser,
            `https://www.thegioididong.com/laptop/${item.product_id}`,
            item.product_id
         );
         // const rate = await crawServices.crawRate(
         //       browser,
         //       `https://www.thegioididong.com/dtdd/${item.href}/danh-gia`,
         //       item.href
         //    );
         productDetails.push(detail);
      }

      browser.close();
      console.log(">>> close browser");

      fs.writeFile(
         "laptop-detail.json",
         JSON.stringify(productDetails),
         (err) => {
            if (err) console.log(">>> write file error", err);
         }
      );

      console.log(">>> file write");
   } catch (error) {
      console.log(error);
      browser.close();
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
