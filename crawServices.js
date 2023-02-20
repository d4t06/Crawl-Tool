function delay() {
   return new Promise(function (resolve) {
      setTimeout(resolve, 3000);
   });
}
async function scrollToBottom() {
   await new Promise((resolve) => {
      const distance = 500; // should be less than or equal to window.innerHeight
      const delay = 200;
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

class crawServices {
   crawProduct = async (browser, url) => {
      try {
         let page = await browser.newPage();

         console.log(">>> mo tab moi");
         await page.goto(url);
         await page.evaluate(delay);
         // await page.setViewport({ width: 1080, height: 1024 });

         const Selector = ".listproduct";
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

               const oldPriceEl = el.querySelector(".price-old");
               const curPriceEl = el.querySelector(".price");

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
                  brand: nameEl.innerText.split(" ")[0],
                  name: nameEl.innerText,
                  category: "dtdd",
                  image:
                     imageEl.getAttribute("src") ||
                     imageEl.getAttribute("data-src"),
                  feature: featureElData ? featureElData : null,
                  old_price: oldPriceEl
                     ? +oldPriceEl.innerText.replaceAll(".", "").slice(0, -1)
                     : null,
                  cur_price: curPriceEl
                     ? +curPriceEl.innerText.replaceAll(".", "").slice(0, -1)
                     : 0,
                  product_label: imageLabelEl
                     ? imageLabelEl.getAttribute("src")
                     : null,
                  intallment: intallmentEl ? true : null,
                  label: labelEl ? labelEl.innerText : null,
                  gift: giftEl ? giftEl.innerText.replaceAll(".", "") : null,
                  pre_order: preOrderEl ? preOrderEl.innerText : false,
               };
            });
            return productsData;
         });
         await page.close();
         console.log(">>> dong tab laptop");

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
                     key: href.slice(6),
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
      try {
         const page = await browser.newPage();
         console.log(">>> mo tab moi", url);
         await page.goto(url);
         await page.evaluate(scrollToBottom);
         // await page.setViewport({ width: 1920, height: 1080 });

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
         const productImages = await page.$eval(".detail", (el) => {
            const nextImgBtn = el.querySelector(".owl-next");
            nextImgBtn.click();
            const imageEls = el.querySelectorAll(".owl-item > a > img");
            let images = "";

            imageEls.forEach((el, index) => {
               const href =
                  el.getAttribute("src") || el.getAttribute("data-src");
               return index <= 7 ? (images += href + "&") : "";
            });
            const paramImgEl = el.querySelector(".img-main > img");
            const param_image = paramImgEl
               ? paramImgEl.getAttribute("src")
               : null;
            return { images, param_image };
         });
         const { images, param_image } = productImages;

         productDetail.images = images;

         productDetail.param_image = param_image;

         // lay anh param
         // const paramImage = await page.$eval(".img-main > img", (el) => {
         //    return el ? el.getAttribute("src") : null;
         // });
         // productDetail.paramImage = paramImage;

         // lay param
         const params = await page.$eval(".parameter", (el) => {
            let paramss = "";
            const paramEls = el.querySelectorAll(".liright");
            paramEls.forEach((el) => {
               let param = "";
               const spanEls = el.querySelectorAll("span");
               spanEls.forEach((span) => {
                  param += span.innerText + "-";
               });

               return (paramss += param + "&");
            });
            return paramss;
         });
         productDetail.params = params;

         await page.close();
         console.log("dong tab detail " + key);
         // console.log(productDetail);
         return productDetail;
      } catch (error) {
         console.log("loi trong qua trinh cao ", error);
      }
   };
   crawImage = async (browser, url) => {
      try {
         const page = await browser.newPage();
         console.log(">>> mo tab moi", url);
         await page.goto(url);
         // await page.evaluate(scrollToBottom);

         const Selector = ".listproduct";
         await page.waitForSelector(Selector);
         // await page.evaluate(delay);

         // lay banner
         const images = await page.$$eval(".box-quicklink__item", (els) => {
            let imageList = "";
            els.forEach((el) => {
               const imgEl = el.querySelector("img");
               imageList +=
                  "https:" + (imgEl ? imgEl.getAttribute("src") : "") + "and";
            });
            return imageList;
         });
         await page.close();
         console.log("dong tab");
         console.log(images);
         // return productDetail;
      } catch (error) {
         console.log("loi trong qua trinh craw ", error);
      }
   };
}

module.exports = new crawServices();
