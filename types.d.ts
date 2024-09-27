type Product = {
   name: string;
   name_ascii: string;
   category_id: number;
   brand_id: number;
   image_url: string;
   colors: Color[];
   variants: Variant[];
   attributes: Attribute[];

   // category: Category;
   // description: Description;

   // colors: ProductColor[];
   // combines: ProductCombine[];
   // comments_data: ProductComment[];
   // default_variant: DefaultVariant;
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
