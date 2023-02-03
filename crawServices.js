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
         await page.setViewport({ width: 1080, height: 1024 });

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
   crawProductsDetail = async (browser, url) => {
      try {
         // return;
         let page = await browser.newPage();

         console.log(">>> mo tab moi", url);
         await page.goto(url);
         await page.setViewport({ width: 1080, height: 1024 });

         const Selector = ".detail";
         await page.waitForSelector(Selector);

         const productDetails = await page.$eval(".detail", (el) => {
            // lay title
            const titleEl = el.querySelector("h1");
            // lay anh noi bat
            const imageEls = el.querySelectorAll(".owl-item > a > img");
            // lay anh thong so
            const detailImageEl = el.querySelector("img.ls-is-cached");
            // lay thong so man hinh

            // const screenParamEls = el.querySelectorAll(".parameter .liright")
            // let screenParam = []

            // screenParamEls.forEach(el => {
            //   let spanEls = el.querySelectorAll("span")
            //   let spanElsText = ""
            //   spanEls.forEach(spanEl => spanElsText += spanEl.innerText)
            //   return screenParam.push(spanElsText);
            // })

            let imageList = [];
            imageEls.forEach((el, index) => {
               const href =
                  el.getAttribute("src") || el.getAttribute("data-src");
               // if (!href.includes('cdn'))
               return index <= 7 ? imageList.push({ href: href }) : "";
            });

            // return data
            return {
               //  name: NewNewkey,
               title: titleEl ? titleEl.innerText : null,
               images: imageList,
               detail: detailImageEl.getAttribute("src"),
               //  detail: {
               //   image: detailImageEl ? detailImageEl[0].getAttribute('src') : null,
               //   specifications: {
               //     screen: screenParam,
               //   }
               //  }
            };
         });

         await browser.close();
         console.log(productDetails);
         console.log(">>> dong tab");
         //  return productDetails;
      } catch (error) {}
   };
}

module.exports = new crawServices();
