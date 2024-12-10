export type AttributeData = { name_ascii: string; take: number[] };

export type AttributeTable = Record<string, AttributeData[]>;

export const mobile: AttributeTable = {
   "1": [
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
         name_ascii: "screen",
         take: [8, 7],
      },
      {
         name_ascii: "rear_camera",
         take: [0],
      },
      {
         name_ascii: "font_camera",
         take: [4],
      },
   ],
   "3": [
      {
         name_ascii: "battery",
         take: [0, 2],
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
         name_ascii: "demensions__weight",
         take: [2],
      },
      {
         name_ascii: "material",
         take: [1],
      },
   ],
};

export const laptop: AttributeTable = {
   "1": [
      {
         name_ascii: "cpu",
         take: [0],
      },
   ],

   "3": [
      {
         name_ascii: "ram",
         take: [0],
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
         name_ascii: "gpu",
         take: [0],
      },
   ],
   "7": [
      {
         name_ascii: "connectivity",
         take: [0],
      },
      {
         name_ascii: "keyboard_light",
         take: [4],
      },
      {
         name_ascii: "wireless_connection",
         take: [1],
      },
      {
         name_ascii: "camera",
         take: [2],
      },
   ],
   "15": [
      {
         name_ascii: "announced",
         take: [4],
      },
      {
         name_ascii: "demensions__weight",
         take: [0],
      },
      {
         name_ascii: "material",
         take: [1],
      },
      {
         name_ascii: "os",
         take: [3],
      },
      {
         name_ascii: "battery",
         take: [2],
      },
   ],
};
