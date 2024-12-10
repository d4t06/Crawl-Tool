type ProductLink = {
   link: string;
   name: string;
   image: string;
   price: number;
   hasVariant: boolean;
};

type Product = {
   name: string;
   category_id: number;
   brand_id: number;
   colors: string[];
   variants: string[];
   attributes: Attribute[];
   image: string;
   sliders: string[];
   price: number;
   description: string;
};

type Color = {
   name_ascii: string;
   name: string;
   // product_slider: ProductSlider;
};

type Variant = {
   name_ascii: string;
   name: string;
   // default_combine: DefaultVariantCombineDetail;
};

type Attribute = {
   // id: number;
   category_attribute_id: number;
   value: string;
};
