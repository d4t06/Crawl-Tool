const crawServices = require("./crawServices");
const fs = require("fs");
const scrawController = async (browserInstance) => {
   try {
      let browser = await browserInstance;
      // let page = await browser.newPage()
      // await page.goto("https://chiasenhac.vn/nhac-hot.html")

      // producst info
      // const products = await crawServices.crawProduct(
      //    browser,
      //    "https://www.thegioididong.com/dtdd#c=42&o=9&pi=1"
      // );
      // fs.writeFile("products.json", JSON.stringify(products), (err) => {
      //    if (err) console.log("ghi data vao file that bai", err);
      // });

      // product links
      // const productLinks = await crawServices.crawProductLinks(
      //   browser,
      //   "https://www.thegioididong.com/dtdd"
      // );

      // products detail
      //  const indexs = [0,1]
      //  const selectedproductLinks = productLinks.filter((link, index) => indexs.some(i => i == index) )
      //  console.log(selectedproductLinks)
      const productLinks = [
         { href: "https://www.thegioididong.com/dtdd/iphone-11" },
         { href: "https://www.thegioididong.com/dtdd/iphone-11" },
      ];

      // const productsDetail = await crawServices.crawProductsDetail(
      //    browser,
      //    "https://www.thegioididong.com/dtdd/iphone-11",
      //    "galaxy-z-flip-4"
      // );
      let productDetails = [];
      for (let link of productLinks) {
         console.log(link);
         const detail = await crawServices.crawProductsDetail(
            browser,
            link.href,
            "galaxy-z-flip-4"
         );
         productDetails.push(detail);
      }
      browser.close();
      fs.writeFile("details.json", JSON.stringify(productDetails), (err) => {
         if (err) console.log("ghi data vao file that bai", err);
      });

      console.log(productDetails);
   } catch (error) {
      console.log(error);
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
