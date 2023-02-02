class crawServices {
   crawProduct = async (browser, url) => {
      try {
         let page = await browser.newPage();

         console.log(">>> mo tab moi");
         await page.goto(url);
         await page.setViewport({ width: 1080, height: 1024 });

         const Selector = ".listproduct";
         await page.waitForSelector(Selector);

         const productsData = await page.$$eval(".main-contain", (els) => {
            productsData = els.map((el, index) => {
               // if (index > 10) return;
               const imageEl = el.querySelector(".item-img > img.thumb");
               const nameEl = el.querySelector("h3");
               const specifEls = el.querySelectorAll(".item-compare > span");
               const specifElData = [];
               specifEls.forEach((item) => specifElData.push(item.innerText));

               const curPriceEl = el.querySelector(".price");
               const oldPriceEl = el.querySelector("p.price-old");

               const imageLabelEl = el.querySelector(
                  ".item-img > img.lbliconimg"
               );
               const eventEl = el.querySelector(".result-label > span");
               const traGopEl = el.querySelector("span.lb-tragop");
               return {
                  name: nameEl.innerText,
                  image:
                     imageEl.getAttribute("src") ||
                     imageEl.getAttribute("data-src"),
                  special: specifElData ? specifElData : null,
                  old_price: oldPriceEl ? oldPriceEl.innerText : null,
                  cur_price: curPriceEl ? curPriceEl.innerText : "curPrice",
                  data: {
                     tra_gop: traGopEl ? true : false,
                     image_label: imageLabelEl
                        ? imageLabelEl.getAttribute("src")
                        : null,
                     event: eventEl ? eventEl.innerText : null,
                  },
               };
            });
            return productsData;
         });
         await browser.close();
         console.log(">>> dong trinh duyet");

         return productsData;
      } catch (error) {
         console.log("loi o craw service", error);
      }
   };
}

module.exports = new crawServices();
