import { Browser } from "puppeteer-core";
import { initProductObject } from "./utils";
import { AttributeInfo, attributeTableOrder } from "./constants/attributeOrder";

import * as categories from "./constants/categories.json";
import * as skipList from "./constants/skip.json";
import { retry } from "puppeteer-core/lib/esm/third_party/rxjs/rxjs.js";

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
               const priceEle = el.querySelector(".price");
               const imageELe = el.querySelector(
                  ".item-img img"
               ) as HTMLImageElement;

               return {
                  link: "https://www.thegioididong.com" + href,
                  name: nameEle.textContent.trim(),
                  image:
                     imageELe.src || imageELe.getAttribute("data-src") || "",
                  price:
                     +priceEle.textContent
                        .trim()
                        .replaceAll(".", "")
                        .slice(0, -1) || 0,
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
         page.setDefaultTimeout(0);

         // console.log(">>> Open tab", "https://www.thegioididong.com/dtdd");
         await page.goto("https://www.thegioididong.com/dtdd#c=42&o=13&pi=1");

         const products: Product[] = [];

         const targetCategory = categories.find(
            (c) => c.name_ascii === category
         );

         if (!targetCategory) return;

         const productLinks = await page.$$eval(
            ".main-contain",
            (els, [skipList]) => {
               const links: ProductLink[] = [];

               els.forEach((el) => {
                  const preOrderEle = el.querySelector(".preorder");
                  if (preOrderEle) return;

                  const variantBoxEle = el.querySelector(".prods-group");
                  if (!variantBoxEle) return;

                  const href = el ? el.getAttribute("href") : null;
                  const nameEle = el.querySelector("h3");
                  const priceEle = el.querySelector(".price");
                  const imageELe = el.querySelector(
                     ".item-img img"
                  ) as HTMLImageElement;

                  const productUrl = "https://www.thegioididong.com" + href;

                  if (skipList.includes(productUrl)) return;

                  links.push({
                     link: productUrl,
                     name: nameEle.innerText.trim(),
                     image:
                        imageELe.src || imageELe.getAttribute("data-src") || "",
                     price:
                        +priceEle.textContent
                           .trim()
                           .replaceAll(".", "")
                           .slice(0, -1) || 0,
                  });
               });

               return links;
            },
            [skipList]
         );

         for (let index = 0; index < productLinks.length; index++) {
            if (index > 1) continue;

            const productLink = productLinks[index];

            console.log(">>> Open tab: ", productLink.link);

            await page.goto(productLink.link);

            const Selector = ".detail";
            await page
               .waitForSelector(Selector)
               .catch((err) => console.log("Time out"));

            const product = initProductObject({
               category_id: targetCategory.id,
               name: productLink.name,
               image: productLink.image,
               price: productLink.price,
            });

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

                     const attributeInfos: AttributeInfo[] =
                        attributeTableOrder[`${indexAttr}`];
                     if (!attributeInfos) return;

                     for (const attributeInfo of attributeInfos) {
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
                                 "/n " +
                                 testEles[indexToTake].textContent.trim();
                        });

                        attributes.push({
                           value,
                           category_attribute_id: categoryAttr.id,
                        });
                     }
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
