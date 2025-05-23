export const baseCategory = [
	{
		id: 2,
		name_ascii: "mobile",
		brands: [
			{ id: 1, name: "iPhone", name_ascii: "iphone", category_id: 2 },
			{ id: 2, name: "Xiaomi", name_ascii: "xiaomi", category_id: 2 },
			{ id: 3, name: "Samsung", name_ascii: "samsung", category_id: 2 },
			{ id: 4, name: "Oppo", name_ascii: "oppo", category_id: 2 },
			{ id: 5, name: "Vivo", name_ascii: "vivo", category_id: 2 },
			{ id: 6, name: "Realme", name_ascii: "realme", category_id: 2 },
		],
		attributes: [
			{
				id: 1,
				category_id: 2,
				name: "Announced",
				name_ascii: "announced",
			},
			{
				id: 11,
				category_id: 2,
				name: "Battery",
				name_ascii: "battery",
			},
			{ id: 5, category_id: 2, name: "Cpu", name_ascii: "cpu" },
			{
				id: 2,
				category_id: 2,
				name: "Demensions, Weight",
				name_ascii: "demensions__weight",
			},
			{
				id: 7,
				category_id: 2,
				name: "Font camera",
				name_ascii: "font_camera",
			},
			{ id: 6, category_id: 2, name: "Gpu", name_ascii: "gpu" },
			{
				id: 3,
				category_id: 2,
				name: "Material",
				name_ascii: "material",
			},
			{ id: 9, category_id: 2, name: "OS", name_ascii: "os" },
			{
				id: 8,
				category_id: 2,
				name: "Rear camera",
				name_ascii: "rear_camera",
			},
			{
				id: 4,
				category_id: 2,
				name: "Screen",
				name_ascii: "screen",
			},
			{ id: 10, category_id: 2, name: "Sim", name_ascii: "sim" },
		],
	},
	{
		id: 3,
		name_ascii: "laptop",
		brands: [
			{ id: 7, name: "Msi", name_ascii: "msi", category_id: 3 },
			{ id: 8, name: "Dell", name_ascii: "dell", category_id: 3 },
			{ id: 9, name: "Hp", name_ascii: "hp", category_id: 3 },
			{ id: 10, name: "Acer", name_ascii: "acer", category_id: 3 },
			{ id: 11, name: "Lenovo", name_ascii: "lenovo", category_id: 3 },
			{ id: 12, name: "Asus", name_ascii: "asus", category_id: 3 },
			{ id: 13, name: "Macbook", name_ascii: "macbook", category_id: 3 },
		],
		attributes: [
			{
				id: 12,
				category_id: 3,
				name: "Announced",
				name_ascii: "announced",
			},
			{
				id: 25,
				category_id: 3,
				name: "Battery",
				name_ascii: "battery",
			},
			{
				id: 20,
				category_id: 3,
				name: "Camera",
				name_ascii: "camera",
			},
			{
				id: 23,
				category_id: 3,
				name: "Connectivity",
				name_ascii: "connectivity",
			},
			{ id: 16, category_id: 3, name: "CPU", name_ascii: "cpu" },
			{
				id: 13,
				category_id: 3,
				name: "Demensions, Weight",
				name_ascii: "demensions__weight",
			},
			{ id: 17, category_id: 3, name: "GPU", name_ascii: "gpu" },
			{
				id: 24,
				category_id: 3,
				name: "Keyboard light",
				name_ascii: "keyboard_light",
			},
			{
				id: 14,
				category_id: 3,
				name: "Material",
				name_ascii: "material",
			},
			{ id: 21, category_id: 3, name: "Os", name_ascii: "os" },
			{ id: 18, category_id: 3, name: "Ram", name_ascii: "ram" },
			{
				id: 15,
				category_id: 3,
				name: "Screen",
				name_ascii: "screen",
			},
			{
				id: 19,
				category_id: 3,
				name: "Storage",
				name_ascii: "storage",
			},
			{
				id: 22,
				category_id: 3,
				name: "Wireless connection",
				name_ascii: "wireless_connection",
			},
		],
	},
];

export const hdMobileCategory = [
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
			{ name_ascii: "battery", id: 2 },
			{ name_ascii: "cpu", id: 3 },
			{ name_ascii: "demensions__weight", id: 4 },
			{ name_ascii: "font_camera", id: 5 },
			{ name_ascii: "gpu", id: 6 },
			{ name_ascii: "material", id: 7 },
			{ name_ascii: "os", id: 8 },
			{ name_ascii: "rear_camera", id: 9 },
			{ name_ascii: "screen", id: 10 },
			{ name_ascii: "sim", id: 11 },
		],
	},
	{
		name_ascii: "laptop",
		id: 4,
		brands: [
			{ name_ascii: "acer", id: 17 },
			{ name_ascii: "asus", id: 19 },
			{ name_ascii: "dell", id: 15 },
			{ name_ascii: "hp", id: 16 },
			{ name_ascii: "lenovo", id: 18 },
			{ name_ascii: "macbook", id: 20 },
			{ name_ascii: "msi", id: 14 },
		],
		attributes: [
			{ name_ascii: "announced", id: 20 },
			{ name_ascii: "battery", id: 33 },
			{ name_ascii: "camera", id: 28 },
			{ name_ascii: "connectivity", id: 31 },
			{ name_ascii: "cpu", id: 24 },
			{ name_ascii: "demensions__weight", id: 21 },
			{ name_ascii: "gpu", id: 25 },
			{ name_ascii: "keyboard_light", id: 32 },
			{ name_ascii: "material", id: 22 },
			{ name_ascii: "os", id: 29 },
			{ name_ascii: "ram", id: 26 },
			{ name_ascii: "screen", id: 23 },
			{ name_ascii: "storage", id: 27 },
			{ name_ascii: "wireless_connection", id: 30 },
		],
	},
];

export type Category = (typeof baseCategory)[0];
