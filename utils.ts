const fs = require("fs");

export const scrollToBottom = async () =>
   new Promise<void>((rs) => {
      const distance = 500; // should be less than or equal to window.innerHeight
      const delay = 200;
      const timer = setInterval(() => {
         document.scrollingElement?.scrollBy(0, distance);

         if (!document.scrollingElement) {
            clearInterval(timer);
            rs();
            return;
         }

         if (
            document.scrollingElement.scrollTop + window.innerHeight >=
            document.scrollingElement.scrollHeight / 2
         ) {
            clearInterval(timer);
            rs();
         }
      }, delay);
   });

export const generateId = (name: string): string => {
   const convertToEn = (str: string) => {
      const newString = str
         .toLocaleLowerCase()
         .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
         .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
         .replace(/ì|í|ị|ỉ|ĩ/g, "i")
         .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ/g, "o")
         .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
         .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
         .replace(/đ/g, "d");
      return newString;
   };
   return convertToEn(name).replaceAll(/[\W_]/g, "-");
};

export const initProductObject = (data: Partial<Product>) => {
   const newProduct: Product = {
      image_url: "",
      name: "",
      name_ascii: "",
      brand_id: 0,
      category_id: 0,
      attributes: [],
      colors: [],
      variants: [],
      ...data,
   };

   return newProduct;
};

export const writeFile = (data: any) =>
   fs.writeFile("laptop-detail.json", JSON.stringify(data), (err) => {
      if (err) console.log(">>> write file error", err);
   });
