import * as attributeTable from "./attributeOrder";
import { baseCategory, Category, hdMobileCategory } from "./categories";

export type Config = {
	name: string;
	category: string;
	page: string;
	attributeTable: attributeTable.AttributeTable;
	categories: Category[];
};

export const baseConfig: Config = {
	name: "base",
	category: "laptop",
	page: "https://www.thegioididong.com/laptop-apple-macbook",
	attributeTable: attributeTable.laptop,
	categories: baseCategory,
};

export const hdMobileConfig: Config = {
	name: "hd-mobile",
	category: "laptop",
	page: "https://www.thegioididong.com/laptop-apple-macbook",
	attributeTable: attributeTable.laptop,
	categories: baseCategory,
};

export const vueMobileConfig: Config = {
	name: "vue-mobiel",
	category: "mobile",
	page: "https://www.thegioididong.com/dtdd",
	attributeTable: attributeTable.mobile,
	categories: baseCategory,
};
