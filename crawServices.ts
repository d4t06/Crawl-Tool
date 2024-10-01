import { Browser } from "puppeteer-core";
import { initProductObject } from "./utils";
import { attributeTableOrder, categories } from "./constant";

type Category = (typeof categories)[0];

class CrawService {
   crawProductLinks = async (browser, url) => {
      try {
         let page = await browser.newPage();

         await page.goto(url);

         const Selector = ".listproduct";
         await page.waitForSelector(Selector);

         const productLinks = await page.$$eval(".main-contain", (els) =>
            els.map((el) => {
               const href = el ? el.getAttribute("href") : null;
               const nameEle = el.querySelector("h3");
               const imageELe = el.querySelector(
                  ".item-img img"
               ) as HTMLImageElement;

               return {
                  link: "https://www.thegioididong.com" + href,
                  name: nameEle.textContent.trim(),
                  image:
                     imageELe.src || imageELe.getAttribute("data-src") || "",
               } as ProductLink;
            })
         );
         await browser.close();

         return productLinks;
      } catch (error) {
         console.log(">>> co loi trong luc mo tab", error);
      }
   };

   crawProduct = async (browser: Browser, category: string) => {
      try {
         const page = await browser.newPage();
         page.setDefaultTimeout(10000);

         // console.log(">>> Open tab", "https://www.thegioididong.com/dtdd");
         await page.goto("https://www.thegioididong.com/dtdd");

         const products: Product[] = [];

         const targetCategory = categories.find(
            (c) => c.name_ascii === category
         );

         if (!targetCategory) return;

         const productLinks = await page.$$eval(".main-contain", (els) =>
            els.map((el) => {
               const href = el ? el.getAttribute("href") : null;
               const nameEle = el.querySelector("h3");
               const imageELe = el.querySelector(
                  ".item-img img"
               ) as HTMLImageElement;

               return {
                  link: "https://www.thegioididong.com" + href,
                  name: nameEle.innerText.trim(),
                  image:
                     imageELe.src || imageELe.getAttribute("data-src") || "",
               } as ProductLink;
            })
         );

         for (let index = 0; index < productLinks.length; index++) {
            if (index > 1) continue;

            const productLink = productLinks[index];

            console.log(">>> Open tab: ", productLink.link);

            await page.goto(productLink.link);

            const Selector = ".detail";
            await page.waitForSelector(Selector);

            const product = initProductObject({
               category_id: targetCategory.id,
               name: productLink.name,
               image: productLink.image,
            });

            /** price */
            const price = await page.$eval(".box-price-present", (el) =>
               el.textContent.trim().replaceAll(".", "").slice(0, -1)
            );

            product.price = +price;

            /** brand */
            const targetBrand = targetCategory.brands.find(
               (b) => b.name_ascii === product.name.split(" ")[0].toLowerCase()
            );

            if (targetBrand) {
               product.brand_id = targetBrand.id;
            }

            /** colors */
            const colors = await page.$$eval(".box03.color .item", (eles) =>
               eles.map((el) => el.textContent.trim())
            );
            product.colors = colors;

            /** variant */
            const variantName = await page.$eval(
               ".box03.group.desk .item.act",
               (ele) => ele.textContent.trim()
            );
            product.variants = [variantName];

            /** attributes */
            const attributes = await page.$$eval(
               ".box-specifi > a",
               (eles, [targetCategory, attributeTableOrder]) => {
                  /**
                   * a
                   * ul .text-specifi
                   *    li
                   */

                  const attributes: Attribute[] = [];

                  eles.forEach((el) => {
                     const indexAttr = el.getAttribute("data-index");

                     const attributeInfo = attributeTableOrder[`${indexAttr}`];
                     if (!attributeInfo) return;

                     const categoryAttributes =
                        targetCategory.attributes as Category["attributes"];

                     const categoryAttr = categoryAttributes.find(
                        (cA) => cA.name_ascii === attributeInfo.name_ascii
                     );

                     if (!categoryAttr) return;

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

                     attributes.push({
                        value,
                        category_attribute_id: categoryAttr.id,
                     });
                  });

                  return attributes;
               },
               [targetCategory, attributeTableOrder]
            );

            product.attributes = attributes;

            /** sliders */
            const images = await page.$$eval(
               ".box_left .gallery-img .owl-carousel .item-img img",
               (eles) => {
                  return eles.map(
                     (el) => el.src || el.getAttribute("data-src")
                  );
               }
            );
            product.sliders = images;

            products.push(product);

            // await page.close();
            console.log(">>> close tab");
         }

         return products;
      } catch (error) {
         console.log("service error ", error);
      }
   };
}

export default new CrawService();
