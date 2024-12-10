export const baseCategory = [
	{
		name_ascii: "mobile",
		id: 2,
		brands: [
			{ name_ascii: "iphone", id: 1 },
			{ name_ascii: "oppo", id: 4 },
			{ name_ascii: "realme", id: 6 },
			{ name_ascii: "samsung", id: 3 },
			{ name_ascii: "vivo", id: 5 },
			{ name_ascii: "xiaomi", id: 2 },
		],
		attributes: [
			{ name_ascii: "announced", id: 1 },
			{ name_ascii: "battery", id: 11 },
			{ name_ascii: "cpu", id: 5 },
			{ name_ascii: "demensions__weight", id: 2 },
			{ name_ascii: "font_camera", id: 7 },
			{ name_ascii: "gpu", id: 6 },
			{ name_ascii: "material", id: 3 },
			{ name_ascii: "os", id: 9 },
			{ name_ascii: "rear_camera", id: 8 },
			{ name_ascii: "screen", id: 4 },
			{ name_ascii: "sim", id: 10 },
		],
	},
	{
		name_ascii: "laptop",
		id: 3,
		brands: [
			{ name_ascii: "acer", id: 10 },
			{ name_ascii: "asus", id: 12 },
			{ name_ascii: "dell", id: 8 },
			{ name_ascii: "hp", id: 9 },
			{ name_ascii: "lenovo", id: 11 },
			{ name_ascii: "macbook", id: 13 },
			{ name_ascii: "msi", id: 7 },
		],
		attributes: [
			{ name_ascii: "announced", id: 12 },
			{ name_ascii: "battery", id: 24 },
			{ name_ascii: "camera", id: 20 },
			{ name_ascii: "connectivity", id: 22 },
			{ name_ascii: "cpu", id: 16 },
			{ name_ascii: "demensions__weight", id: 13 },
			{ name_ascii: "gpu", id: 17 },
			{ name_ascii: "keyboard_light", id: 23 },
			{ name_ascii: "material", id: 14 },
			{ name_ascii: "os", id: 25 },
			{ name_ascii: "ram", id: 18 },
			{ name_ascii: "screen", id: 15 },
			{ name_ascii: "storage", id: 19 },
			{ name_ascii: "wireless_connection", id: 21 },
		],
	},
];

export type Category = (typeof baseCategory)[0];
