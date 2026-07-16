export type SidebarToolItem = {
	id: string;
	name: string;
	subtitle?: string;
	badge?: string;
	thumbnail?: string;
};

export type SidebarSection = {
	id: string;
	heading: string;
	items: SidebarToolItem[];
};

/**
 * Source: Figma "Screen Components" / Workspace AI, Sidebar > AI Tools tab.
 * Only sections/items visible in the provided design frame are listed —
 * the remaining categories from the component inventory (Transform, Vector,
 * Audio, Enhance, Prompts, Analyse images, 3D, Additional) share the same
 * SidebarSection shape and can be appended once their real copy is available.
 */
export const sidebarSections: SidebarSection[] = [
	{
		id: "train-your-model",
		heading: "Train your model",
		items: [{ id: "lora-train-flux", name: "LORA Train Flux", badge: "500" }]
	},
	{
		id: "generate-image",
		heading: "Generate image",
		items: [
			{ id: "nano-banana", name: "Nano Banana", badge: "NEW" },
			{ id: "flux3", name: "FLUX3", badge: "NEW" },
			{ id: "gpt-image", name: "GPT Image" },
			{ id: "seedream", name: "Seedream" },
			{ id: "z-image", name: "Z Image" },
			{ id: "wan-image", name: "WAN Image" },
			{ id: "qwen", name: "QWEN" },
			{ id: "flux", name: "FLUX" },
			{ id: "midjourney", name: "MidJourney" },
			{ id: "krea", name: "Krea" },
			{ id: "imagen", name: "Imagen" },
			{ id: "ideogram", name: "Ideogram" },
			{ id: "kling-omni-image", name: "Kling Omni Image" },
			{ id: "recraft-image", name: "Recraft Image" }
		]
	},
	{
		id: "generate-videos",
		heading: "Generate videos",
		items: [{ id: "veo", name: "Veo" }]
	}
];
