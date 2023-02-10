const crawServices = require("./crawServices");
const FPTcrawServices = require("./fpt_crawServices");
const fs = require("fs");
const scrawController = async (browserInstance) => {
   const tddd = "https://www.thegioididong.com/laptop-ldp";
   const fpt = "https://fptshop.com.vn/may-tinh-xach-tay";
   try {
      let browser = await browserInstance;
      // let page = await browser.newPage()
      // await page.goto("https://chiasenhac.vn/nhac-hot.html")

      // producst info
      const products = await crawServices.crawImage(browser, tddd);
      // fs.writeFile("products.json", JSON.stringify(products), (err) => {
      //    if (err) console.log("ghi data vao file that bai", err);
      // });

      // product links
      // const productLinks = await crawServices.crawProductLinks(
      //    browser,
      //    "https://www.thegioididong.com/dtdd"
      // );

      // products detail
      //  const indexs = [0,1]
      //  const selectedproductLinks = productLinks.filter((link, index) => indexs.some(i => i == index) )
      //  console.log(selectedproductLinks)
      // const productLinks = [
      //    { href: "https://www.thegioididong.com/dtdd/iphone-11" },
      //    { href: "https://www.thegioididong.com/dtdd/iphone-11" },
      // ];

      // const productsDetail = await crawServices.crawProductsDetail(
      //    browser,
      //    "https://www.thegioididong.com/dtdd/iphone-11",
      //    "galaxy-z-flip-4"
      // );
      // let i = 0;
      // let productDetails = [];
      // for (let item of products) {
      //    if (item.pre_order) continue;
      //    if (item.href === "iphone-14-plus") continue;
      //    // if (i >= 2) continue;
      //    // i++;
      //    console.log(">>> truy cap " + item.href);
      //    const detail = await crawServices.crawProductsDetail(
      //       browser,
      //       `https://www.thegioididong.com/dtdd/${item.href}`,
      //       item.href
      //    );
      //    productDetails.push(detail);
      // }
      // const detail = await crawServices.crawProductsDetail(
      //    browser,
      //    `https://www.thegioididong.com/dtdd/${item.href}`,
      //    item.key
      // );
      browser.close();
      console.log("dong trinh duyet");

      // fs.writeFile("mobile.json", JSON.stringify(products), (err) => {
      //    if (err) console.log("ghi data vao file that bai", err);
      // });

      // console.log(productLinks);
   } catch (error) {
      console.log(error);
      browser.close();
      console.log(">>> loi browser controller");
   }
};

module.exports = scrawController;
