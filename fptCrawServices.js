function delay() {
   return new Promise(function (resolve) {
      setTimeout(resolve, 8000);
   });
}

class crawServices {
   crawProduct = async (browser, url) => {
      try {
         let page = await browser.newPage();

         console.log(">>> mo tab moi");
         await page.goto(url);
         await page.setViewport({ width: 1080, height: 1024 });

         const Selector = "#root";
         await page.waitForSelector(Selector);

         const productsData = await page.$$eval(".main-contain", (els) => {
            productsData = els.map((el, index) => {
               // if (index > 10) return;
               const imageEl = el.querySelector(".item-img > img.thumb");
               const nameEl = el.querySelector("h3");
               const featureEls = el.querySelectorAll(".item-compare > span");
               let featureElData = "";
               featureEls.forEach(
                  (item) => (featureElData += item.innerText + "&")
               );

               const curPriceEl = el.querySelector(".price");
               const oldPriceEl = el.querySelector("p.price-old");

               const imageLabelEl = el.querySelector(
                  ".item-img > img.lbliconimg"
               );
               const labelEl = el.querySelector(".result-label > span");
               const intallmentEl = el.querySelector("span.lb-tragop");
               const href = el ? el.getAttribute("href") : null;
               const preOrderEl = el.querySelector(".preorder");
               const giftEl = el.querySelector(".item-gift");
               return {
                  href: href.slice(6),
                  name: nameEl.innerText,
                  category: "mobile",
                  image:
                     imageEl.getAttribute("src") ||
                     imageEl.getAttribute("data-src"),
                  feature: featureElData ? featureElData : null,
                  old_price: oldPriceEl ? oldPriceEl.innerText : null,
                  cur_price: curPriceEl ? curPriceEl.innerText : "curPrice",
                  product_label: imageLabelEl
                     ? imageLabelEl.getAttribute("src")
                     : null,
                  intallment: intallmentEl ? true : false,
                  label: labelEl ? labelEl.innerText : false,
                  gift: giftEl ? giftEl.innerText : null,
                  pre_order: preOrderEl ? preOrderEl.innerText : false,
               };
            });
            return productsData;
         });
         await page.delay(10000);
         await page.close();
         console.log(">>> dong tab laptop");

         return productsData;
      } catch (error) {
         console.log("loi o craw service", error);
      }
   };

   crawBanner = async (browser, url) => {
      try {
         const page = await browser.newPage();
         console.log(">>> mo tab moi", url);
         await page.goto(url);
         // await page.evaluate(scrollToBottom);

         const Selector = ".category-container";
         await page.waitForSelector(Selector);

         // lay banner
         const bannerImages = await page.$$eval(".slick-slide", (els) => {
            let images = "";
            els.forEach((el) => {
               const imgEl = el.querySelector("div > div > a > img");
               images += (imgEl ? imgEl.getAttribute("src") : "") + "and";
            });
            return images;
         });
         await page.evaluate(delay);
         await page.close();
         console.log("dong tab");
         console.log(bannerImages);
         // return productDetail;
      } catch (error) {
         console.log("loi trong qua trinh craw ", error);
      }
   };
}

module.exports = new crawServices();
