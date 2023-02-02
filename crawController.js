const crawServices = require("./crawServices");
const fs = require("fs");
const scrawController = async (browserInstance) => {
   try {
      let browser = await browserInstance;
      // let page = await browser.newPage()
      // await page.goto("https://chiasenhac.vn/nhac-hot.html")

      const products = await crawServices.crawProduct(
         browser,
         "https://www.thegioididong.com/dtdd#c=42&o=9&pi=2"
      );
      fs.writeFile("products.json", JSON.stringify(products), (err) => {
         if (err) console.log("ghi data vao file that bai", err);
      });
      console.log(products);
   } catch (error) {
      console.log(error);
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
