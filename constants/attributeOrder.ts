import { take } from "puppeteer-core/lib/esm/third_party/rxjs/rxjs.js";

export type AttributeInfo = { name_ascii: string; take: number[] };

export type AttributeMap = Record<string, AttributeInfo[]>;

export type AttributeTable = Record<"dtdd" | "laptop", AttributeMap>;

const mobileAttributeOrder: AttributeMap = {
   "1": [
      {
         name_ascii: "screen",
         take: [2, 1],
      },
   ],
   "6": [
      {
         name_ascii: "sim",
         take: [1],
      },
   ],
   "10": [
      {
         name_ascii: "announced",
         take: [3],
      },
      {
         name_ascii: "demensions--weight",
         take: [2],
      },
      {
         name_ascii: "material",
         take: [1],
      },
   ],
   "4": [
      {
         name_ascii: "cpu",
         take: [1],
      },
      {
         name_ascii: "gpu",
         take: [3],
      },
      {
         name_ascii: "os",
         take: [0],
      },
   ],
   "2": [
      {
         name_ascii: "rear-camera",
         take: [0],
      },
   ],
   "3": [
      {
         name_ascii: "font-camera",
         take: [0],
      },
   ],
   "8": [
      {
         name_ascii: "battery",
         take: [0, 2],
      },
   ],
};

const laptopAttributeOrder: AttributeMap = {
   "1": [
      {
         name_ascii: "processor",
         take: [0, 1, 2],
      },
   ],
   "3": [
      {
         name_ascii: "ram",
         take: [0, 1],
      },
      {
         name_ascii: "storage",
         take: [4],
      },
   ],
   "4": [
      {
         name_ascii: "screen",
         take: [0, 1, 2],
      },
   ],
   "6": [
      {
         name_ascii: "graphic-card",
         take: [0],
      },
   ],
   "7": [
      {
         name_ascii: "connectivity",
         take: [0],
      },
      {
         name_ascii: "keyboard-light",
         take: [4],
      },
   ],
   "15": [
      {
         name_ascii: "weight",
         take: [1],
      },
      {
         name_ascii: "material",
         take: [2],
      },
   ],
   "16": [
      {
         name_ascii: "battery",
         take: [0],
      },
      { name_ascii: "announced", take: [3] },
   ],
};

export const attributeTable: AttributeTable = {
   dtdd: mobileAttributeOrder,
   laptop: laptopAttributeOrder,
};

// "attributes": [
//    {
//       "id": 1,
//       "category_id": 4,
//       "name": "Announced",
//       "name_ascii": "announced"
//    },
//    { "id": 3, "category_id": 4, "name": "Cpu", "name_ascii": "cpu" },
//    {
//       "id": 4,
//       "category_id": 4,
//       "name": "Demensions, Weight",
//       "name_ascii": "demensions--weight"
//    },
//    {
//       "id": 6,
//       "category_id": 4,
//       "name": "Font camera",
//       "name_ascii": "font-camera"
//    },
//    { "id": 5, "category_id": 4, "name": "Gpu", "name_ascii": "gpu" },
//    {
//       "id": 7,
//       "category_id": 4,
//       "name": "Rear camera",
//       "name_ascii": "rear-camera"
//    },
//    { "id": 2, "category_id": 4, "name": "Screen", "name_ascii": "screen" }
// ]
