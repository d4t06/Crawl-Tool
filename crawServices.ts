import { Browser } from "puppeteer-core";
import { initProductObject } from "./utils";
import {
   AttributeMap,
   AttributeTable,
   attributeTable,
} from "./constants/attributeOrder";

import * as categories from "./constants/categories.json";
import * as skipList from "./constants/skip.json";

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

   crawProduct = async (
      browser: Browser,
      category: "dtdd" | "laptop",
      LIMIT: number
   ) => {
      try {
         const page = await browser.newPage();
         page.setDefaultTimeout(0);

         await page.goto(`https://www.thegioididong.com/${category}`);

         const products: Product[] = [];

         const targetCategory = categories.find(
            (c) => c.name_ascii === (category === "dtdd" ? "mobile" : "laptop")
         );

         if (!targetCategory) return [];

         const productLinks = await page.$$eval(
            ".listproduct .main-contain",
            (els, [category, skipList]) => {
               const links: ProductLink[] = [];

               els.forEach((el) => {
                  const preOrderEle = el.querySelector(".preorder");
                  if (preOrderEle) return;

                  if (category === "dtdd") {
                     const variantBoxEle = el.querySelector(".prods-group");
                     if (!variantBoxEle) return;
                  }

                  const href = el ? el.getAttribute("href") : null;
                  const nameEle = el.querySelector("h3");
                  const priceEle = el.querySelector(".price");
                  const imageELe = el.querySelector(
                     ".item-img img"
                  ) as HTMLImageElement;

                  const productUrl = "https://www.thegioididong.com" + href;

                  if (skipList.includes(productUrl)) return;

                  const name = nameEle.innerText.trim();

                  links.push({
                     link: productUrl,
                     name:
                        category === "dtdd"
                           ? name
                           : name.slice(0, name.indexOf("(")).trim(),
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
            [category, skipList]
         );

         for (let index = 0; index < productLinks.length; index++) {
            if (index + 1 > LIMIT) continue;

            const productLink = productLinks[index];
            console.log(">>> Open tab: ", productLink.link);

            await page.goto(productLink.link);
            await page.waitForSelector(".detail");

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

            if (category === "dtdd") {
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
            }

            if (category === "laptop") {
               product.colors = ["default"];
               product.variants = ["default"];
            }

            /** attributes */
            const attributes = await page.$$eval(
               ".box-specifi > a",
               (eles, [category, targetCategory, attributeTable]) => {
                  /**
                   * a
                   * ul .text-specifi
                   *    li
                   */

                  const _targetCategory = targetCategory as Category;
                  const crawCategory = category as "dtdd" | "laptop";
                  const _attributeTable = attributeTable as AttributeTable;

                  const attributes: Attribute[] = [];

                  const attributeMapByCategory: AttributeMap =
                     _attributeTable[crawCategory];

                  eles.forEach((el) => {
                     const indexAttr = el.getAttribute("data-index");

                     const attributeInfos =
                        attributeMapByCategory[`${indexAttr}`];
                     if (!attributeInfos) return;

                     for (const attributeInfo of attributeInfos) {
                        const categoryAttributes = _targetCategory.attributes;

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
               [category, targetCategory, attributeTable]
            );

            product.attributes = attributes;

            /** sliders */
            const images = await page.$$eval(
               ".box_left .gallery-img .owl-carousel .item-img img",
               (eles) => {
                  const url: string[] = [];

                  eles.forEach((el, index) => {
                     if (index > 3) return;
                     url.push(el.src || el.getAttribute("data-src"));
                  });

                  return url;
               }
            );
            product.sliders = images;

            // await page.locator('#tab-spec h2[data-tab="tab-2').click();

            /** review */
            const desc = await page.$$eval(
               ".description > div > * ",
               (eles) => {
                  let descHtml = "";

                  eles.forEach((el, index) => {
                     if (index === 0 || index > 9) return;

                     if (el.tagName.includes("H") || el.tagName.includes("P"))
                        if (el.textContent) {
                           // h5
                           if (el.tagName.includes("H"))
                              descHtml += `<h5>${el.textContent}</h5>`;
                           // p
                           else descHtml += `<p>${el.textContent}</p>`;

                           // image
                        } else {
                           const imageEl = el.querySelector("img");
                           if (imageEl)
                              descHtml += `<img src="${
                                 imageEl.src ||
                                 imageEl.getAttribute("data-src") ||
                                 ""
                              }" />`;
                        }
                  });

                  return descHtml;
               }
            );

            product.description = desc;

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
