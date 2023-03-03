const crawServices = require("./crawServices");
const FPTcrawServices = require("./fpt_crawServices");

const mobiles = require("./mobile.json");
const laptops = require("./laptop.json");

const fs = require("fs");

const scrawController = async (browserInstance) => {
   const tddd = {
      dtdd: "https://www.thegioididong.com/dtdd#c=42&o=17&pi=1",
      laptop: "https://www.thegioididong.com/laptop#c=44&o=9&pi=1",
   };
   const fpt = "https://fptshop.com.vn/may-tinh-xach-tay";
   try {
      let browser = await browserInstance;

      // >>> producst info
      // const products = await crawServices.crawProduct(browser, tddd["dtdd"]);

      // >>> product detail
      // let i = 1;
      // let productDetails = [];
      // for (let item of laptops) {
      //    // if (i >= 20) break;
      //    // i++;
      //    console.log(">>> truy cap " + item.href);
      //    const detail = await crawServices.crawProductsDetail(
      //       browser,
      //       `https://www.thegioididong.com/laptop/${item.href}`,
      //       item.href
      //    );
      //    productDetails.push(detail);
      // }

      // >>> rate
      let rates = []
      let i = 1;
       for (let item of mobiles) {
         if (i > 2) break;
         i ++;
         const rate = await crawServices.crawRate(
            browser,
            `https://www.thegioididong.com/dtdd/${item.href}/danh-gia`,
            item.href
         );
         rates.push(rate);
      }
      

      browser.close();
      console.log("dong trinh duyet");

      // fs.writeFile(
      //    "laptop-detail.json",
      //    JSON.stringify(productDetails),
      //    (err) => {
      //       if (err) console.log("ghi data vao file that bai", err);
      //    }
      // );

      // fs.writeFile(
      //    "laptop-detail.json",
      //    JSON.stringify(productDetails),
      //    (err) => {
      //       if (err) console.log("ghi data vao file that bai", err);
      //    }
      // );

         fs.writeFile(
         "mobile-rate.json",
         JSON.stringify(rates),
         (err) => {
            if (err) console.log("ghi data vao file that bai", err);
         }
      );

      // console.log(productDetails);
   } catch (error) {
      console.log(error);
      browser.close();
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
