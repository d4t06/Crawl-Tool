export const categories = [{"id":2,"name":"Mobile","name_ascii":"mobile","attribute_order":"","hidden":false,"brands":[{"id":1,"name":"iPhone","name_ascii":"iphone","image_url":"","category_id":2}],"attributes":[]}]

export const attributeTableOrder: Record<
   string,
   { name_ascii: string; take: number[] }
> = {
   "1": {
      name_ascii: "screen",
      take: [2, 1],
   },
   "10": {
      name_ascii: "announced",
      take: [3],
   },
};
