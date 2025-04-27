import { Browser, Page } from "puppeteer-core";
import { initProductObject } from "./utils";

import * as skipList from "./constants/skip.json";
import { Category } from "./constants/categories";
import { AttributeData } from "./constants/attributeOrder";
import { Config } from "./constants/config";

const craw = async (
   url: string,
   page: Page,
   config: Config,
   targetCategory: Category,
   data: ProductLink,
) => {
   try {
      console.log(">>> Open tab: ", url);

      await page.goto(url);

      const Selector = ".detail";
      await page.waitForSelector(Selector).catch((err) => console.log("Time out"));

      const product = initProductObject({
         category_id: targetCategory.id,
         name: data.name,
         image: data.image,
         price: data.price,
      });

      /** brand */
      const targetBrand = targetCategory.brands.find(
         (b) => b.name_ascii === product.name.split(" ")[0].toLowerCase(),
      );

      if (targetBrand) {
         product.brand_id = targetBrand.id;
      }

      if (data.hasVariant) {
         /** colors */
         const colors = await page.$$eval(".box03.color .item", (eles) =>
            eles.map((el) => el.textContent.trim()),
         );
         product.colors = colors;

         /** variant */
         const variantName = await page.$eval(".box03.group.desk .item.act", (ele) =>
            ele.textContent.trim(),
         );
         product.variants = [variantName];
      } else {
         product.colors = ["default"];
         product.variants = ["default"];
      }

      /** attributes */
      const attributes = await page.$$eval(
         ".box-specifi > a",
         (eles, [targetCategory, config]: [Category, Config]) => {
            /**
             * a
             * ul .text-specifi
             *    li
             */

            const attributes: Attribute[] = [];

            eles.forEach((el) => {
               const indexAttr = el.getAttribute("data-index");

               const attributeMap: AttributeData[] =
                  config.attributeTable[`${indexAttr}`];
               if (!attributeMap) return;

               for (const attributeData of attributeMap) {
                  const categoryAttr = targetCategory.attributes.find(
                     (cA) => cA.name_ascii === attributeData.name_ascii,
                  );

                  if (!categoryAttr) return;

                  const testEles = el.nextElementSibling.querySelectorAll(
                     "li aside:nth-child(2)",
                  );

                  let value = "";
                  attributeData.take.forEach((indexToTake, index) => {
                     const text = testEles[indexToTake]?.textContent?.trim();

                     if (!text) return;

                     if (index === 0) value += text;
                     else value += "/n " + text;
                  });

                  attributes.push({
                     value,
                     category_attribute_id: categoryAttr.id,
                  });
               }
            });

            return attributes;
         },
         [targetCategory, config],
      );

      product.attributes = attributes;

      /** sliders */
      const images = await page.$$eval(
         ".box_left .gallery-img .owl-carousel .item-img img",
         (eles) => {
            const images: string[] = [];

            eles.forEach((el, i) => {
               if (i >= 3) return;
               images.push(el.src || el.getAttribute("data-src"));
            });

            return images;
         },
      );
      product.sliders = images;

      /** description */
      const desc = await page.$$eval(".text-detail > *", (eles) => {
         let html = "";

         eles.forEach((el, i) => {
            if (i >= 7) return;
            // if contain text
            if (!!el.textContent) {
               let tag = "p";

               // if heading tag
               if (el.tagName.toLocaleLowerCase().includes("h")) {
                  tag = "h5";
               }

               html += `<${tag}>${el.textContent}</${tag}>`;
            } else {
               // check if contain image
               const images = el.querySelectorAll("img");
               if (!!images.length) {
                  images.forEach((img) => {
                     const src = img.getAttribute("data-src") || img.src;

                     if (src) html += `<img src='${src}' />`;
                  });
               }
            }
         });

         return html;
      });

      product.description = desc;

      // await page.evaluate(() => {
      //    debugger;
      // });

      await page.close();

      return product;
   } catch (error) {
      throw Error(error.message);
   }
};

class CrawService {
   crawProduct = async (browser: Browser, config: Config) => {
      try {
         const page = await browser.newPage();
         await page.goto(config.page);

         const products: Product[] = [];

         const targetCategory = config.categories.find(
            (c) => c.name_ascii === config.category,
         );

         if (!targetCategory) return [];

         const productDatas = await page.$$eval(
            ".main-contain",
            (els, [skipList]) => {
               const links: ProductLink[] = [];

               els.forEach((el) => {
                  const preOrderEle = el.querySelector(".preorder");
                  if (preOrderEle) return;

                  const variantBoxEle = el.querySelector(".prods-group");
                  const href = el.getAttribute("href");
                  const nameEle = el.querySelector("h3");
                  const priceEle = el.querySelector(".price");
                  const imageELe = el.querySelector(".item-img img") as HTMLImageElement;

                  const productUrl = "https://www.thegioididong.com" + href;

                  if (skipList.includes(productUrl)) return;

                  links.push({
                     link: productUrl,
                     name: nameEle.innerText.trim(),
                     image: imageELe.src || imageELe.getAttribute("data-src") || "",
                     hasVariant: !!variantBoxEle,
                     price:
                        +priceEle.textContent.trim().replaceAll(".", "").slice(0, -1) ||
                        0,
                  });
               });

               return links;
            },
            [skipList],
         );

         for (let index = 0; index < productDatas.length; index++) {
            if (index >= 5) continue;
            const productData = productDatas[index];

            const p = await craw(
               productData.link,
               page,
               config,
               targetCategory,
               productData,
            );

            products.push(p);
         }

         return products;
      } catch (error) {
         console.log("service error ", error);
      }
   };

   crawOneProduct = async (browser: Browser, config: Config, data: ProductLink) => {
      try {
         const page = await browser.newPage();

         const targetCategory = config.categories.find(
            (c) => c.name_ascii === config.category,
         );

         if (!targetCategory) return;

         const p = await craw(data.link, page, config, targetCategory, data);
         return [p];
      } catch (error) {
         console.log("service error ", error);
      }
   };
}

export default new CrawService();
