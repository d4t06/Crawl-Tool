import * as attributeTable from "./attributeOrder";
import { baseCategory, Category } from "./categories";

export type Config = {
	name: string;
	category: string;
	page: string;
	attributeTable: attributeTable.AttributeTable;
	categories: Category[];
};

export const baseConfig: Config = {
	name: "base",
	category: "mobile",
	page: "https://www.thegioididong.com/dtdd",
	attributeTable: attributeTable.mobile,
	categories: baseCategory,
};

export const hdMobileConfig: Config = {
	name: "hd-mobile",
	category: "mobile",
	page: "https://www.thegioididong.com/dtdd",
	attributeTable: attributeTable.mobile,
	categories: baseCategory,
};

export const vueMobileConfig: Config = {
	name: "vue-mobiel",
	category: "mobile",
	page: "https://www.thegioididong.com/dtdd",
	attributeTable: attributeTable.mobile,
	categories: baseCategory,
};
