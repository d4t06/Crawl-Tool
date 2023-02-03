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
               const href = el ? el.getAttribute("href") : null;
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
                  href: href.slice(6).replaceAll("-", " "),
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
   crawProductLinks = async (browser, url) => {
      try {
         let page = await browser.newPage();

         console.log(">>> mo tab moi");
         await page.goto(url);
         // await page.setViewport({ width: 1080, height: 1024 });

         const Selector = ".listproduct";
         await page.waitForSelector(Selector);

         const productDetailLinks = await page.$$eval(
            ".main-contain",
            (els) => {
               productDetailLinks = els.map((el) => {
                  // const hrefEl = el.querySelector
                  const href = el ? el.getAttribute("href") : null;
                  return {
                     href: "https://www.thegioididong.com" + href,
                  };
               });
               return productDetailLinks;
            }
         );
         console.log(">>> dong tab");
         await browser.close();

         return productDetailLinks;
      } catch (error) {
         console.log(">>> co loi trong luc mo tab", error);
      }
   };
   crawProductsDetail = async (browser, url, key) => {
      async function scrollToBottom() {
         await new Promise((resolve) => {
            const distance = 700; // should be less than or equal to window.innerHeight
            const delay = 100;
            const timer = setInterval(() => {
               document.scrollingElement.scrollBy(0, distance);
               if (
                  document.scrollingElement.scrollTop + window.innerHeight >=
                  document.scrollingElement.scrollHeight / 2
               ) {
                  clearInterval(timer);
                  resolve();
               }
            }, delay);
         });
      }

      const page = await browser.newPage();
      console.log(">>> mo tab moi", url);
      await page.goto(url);
      await page.evaluate(scrollToBottom);
      await page.setViewport({ width: 1920, height: 1080 });

      const Selector = ".detail";
      await page.waitForSelector(Selector);

      let productDetail = {};
      productDetail.key = key;
      // lay title
      const title = await page.$eval(".detail > h1", (el) => {
         return el ? el.innerText : null;
      });
      productDetail.title = title;
      // lay anh
      const images = await page.$eval(".detail", (el) => {
         const nextImgBtn = el.querySelector(".owl-next");
         nextImgBtn.click();
         const imageEls = el.querySelectorAll(".owl-item > a > img");
         let images = [];
         imageEls.forEach((el, index) => {
            const href = el.getAttribute("src") || el.getAttribute("data-src");
            return index <= 7 ? images.push(href) : "";
         });
         return images;
      });
      productDetail.images = images;

      // lay anh param
      const paramImage = await page.$eval(".img-main > img", (el) => {
         return el.getAttribute("src");
      });
      productDetail.paramImage = paramImage;
      // lay param
      const params = await page.$eval(".parameter", (el) => {
         let paramss = [];
         const paramEls = el.querySelectorAll(".liright");
         paramEls.forEach((el) => {
            let param = "";
            const spanEls = el.querySelectorAll("span");
            spanEls.forEach((span) => {
               param += span.innerText;
            });

            return paramss.push(param);
         });
         return paramss;
      });
      productDetail.params = params;

      await browser.close();
      console.log("dong tab");
      console.log(productDetail);
      return;
   };
}

module.exports = new crawServices();
