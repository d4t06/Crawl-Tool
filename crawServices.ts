import { Browser } from "puppeteer";
import { generateId, initProductObject, scrollToBottom } from "./utils";

class CrawService {
   crawProductLinks = async (browser, url, id) => {
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
               const links = els.map((el) => {
                  // const hrefEl = el.querySelector
                  const href = el ? el.getAttribute("href") : null;
                  return {
                     href: "https://www.thegioididong.com" + href,
                     key: href.slice(6),
                  };
               });
               return links;
            }
         );
         console.log(">>> dong tab");
         await browser.close();

         return productDetailLinks;
      } catch (error) {
         console.log(">>> co loi trong luc mo tab", error);
      }
   };

   crawProduct = async (browser: Browser, url) => {
      try {
         const categoryAttributes = [
            {
               id: 1,
               category_id: 40,
               name: "Screen",
               name_ascii: "screen",
            },
         ];

         const attributeTableOrder: Record<
            string,
            { name_ascii: string; take: number[] }
         > = {
            "1": {
               name_ascii: "screen",
               take: [2, 1],
            },
            // announced: {
            //    index: 10,
            //    values: [3],
            // },
         };

         const page = await browser.newPage();
         page.setDefaultTimeout(10000);

         console.log(">>> Open tab", url);
         await page.goto(url);
         await page.evaluate(scrollToBottom);

         const Selector = ".detail";
         await page.waitForSelector(Selector);

         const product = initProductObject({
            category_id: categoryAttributes[0].category_id,
         });

         const productName = await page.$eval(
            ".product-name h1",
            (ele: HTMLElement) => {
               return ele.innerText.substring(11);
            }
         );

         product.name = productName;
         product.name_ascii = generateId(productName);

         const colorNames = await page.$$eval(".box03.color .item", (eles) => {
            // eles.forEach((el) => {
            //    ({
            //       name: el.innerText.trim(),
            //       name_ascii: generateId(el.innerText.trim()),
            //    }) as Color;
            // });/
            return eles.map((el) => el.textContent.trim());
         });

         product.colors = colorNames.map((c) => ({
            name: c,
            name_ascii: generateId(c),
         }));

         const variantName = await page.$eval(
            ".box03.group.desk .item.act",
            (ele) => ele.textContent.trim()
         );

         product.colors = colorNames.map((c) => ({
            name: c,
            name_ascii: generateId(c),
         }));

         product.variants = [
            { name: variantName, name_ascii: generateId(variantName) },
         ];

         const attributes = await page.$$eval(
            ".box-specifi > a",
            (eles, [categoryAttributes, attributeTableOrder]) => {
               /**
                * a
                * ul .text-specifi
                *    li
                */

               return eles.map((el) => {
                  const indexAttr = el.getAttribute("data-index");

                  const attributeInfo = attributeTableOrder[`${indexAttr}`];

                  // @ts-ignore
                  // const categoryAttr = categoryAttributes.find(
                  //    (cA) => cA.name_ascii === attributeInfo.name_ascii
                  // );

                  const testEles = el.nextElementSibling.querySelectorAll(
                     "li aside:nth-child(2)"
                  );

                  let value = "";
                  attributeInfo.take.forEach((indexToTake, index) => {
                     if (index === 0)
                        value += testEles[indexToTake].textContent.trim();
                     else
                        value +=
                           "/n " + testEles[indexToTake].textContent.trim();
                  });

                  return {
                     value,
                     category_attribute_id: 1,
                  } as Attribute;
               });
            },
            [categoryAttributes, attributeTableOrder]
         );

         product.attributes = attributes;

         // product.colors = colors;

         // const productImages = await page.$eval(".detail", (el) => {
         //    const imageEls = el.querySelectorAll(".owl-item > a > img");
         //    let images = "";

         //    imageEls.forEach((el, index) => {
         //       if (index === 0) return;

         //       const href =
         //          el.getAttribute("src") || el.getAttribute("data-src");
         //       return index <= 7 ? (images += href + "*and*") : "";
         //    });
         //    // const paramImgEl = el.querySelector(".img-main > img");
         //    // const param_image = paramImgEl
         //    //    ? "https:" + paramImgEl.getAttribute("src")
         //    //    : null;
         //    return { images };
         // });
         // const { images } = productImages;

         // productDetail.param_image = param_image;

         // lay cac option

         // const options = await page.$$eval(".box03.group.desk", (els) => {
         //    let memories = "";
         //    let colors = "";

         //    if (els.length > 1) {
         //       const optionEls = els[0]?.querySelectorAll("a");
         //       optionEls?.forEach((el) => {
         //          const memory = el.innerText;
         //          return (memories += memory + "*and*");
         //       });

         //       const colorEls = els[1]?.querySelectorAll("a");
         //       colorEls?.forEach((el) => {
         //          const color = el.innerText;
         //          return (colors += color + "*and*");
         //       });
         //    } else if (els) {
         //       const colorEls = els[0]?.querySelectorAll("a");
         //       colorEls?.forEach((el) => {
         //          const color = el.innerText;
         //          return (colors += color + "*and*");
         //       });
         //    }

         //    return [colors, memories];
         // });

         // productDetail.colors = options[0] ? options[0] : null;

         // productDetail.memories = options[1] ? options[1] : null;

         // lay anh param
         // const paramImage = await page.$eval(".img-main > img", (el) => {
         //    return el ? el.getAttribute("src") : null;
         // });
         // productDetail.paramImage = paramImage;

         // lay param
         // const params = await page.$eval(".parameter", (el) => {
         //    let paramss = "";
         //    const paramEls = el.querySelectorAll(".liright");
         //    paramEls.forEach((el) => {
         //       let param = "";
         //       const spanEls = el.querySelectorAll("span");
         //       spanEls.forEach((span) => {
         //          param += span.innerText + "//";
         //       });

         //       return (paramss += param + "*and*");
         //    });
         //    return paramss;
         // });
         // productDetail.params = params;

         await page.close();
         console.log(">>> close tab ", url);
         // console.log(productDetail);
         return product;
      } catch (error) {
         console.log("service error ", error);
      }
   };
}

export default new CrawService();
