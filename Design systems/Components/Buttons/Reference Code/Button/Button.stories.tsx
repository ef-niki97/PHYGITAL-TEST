import { createSignal, For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import {
	ButtonSwitcher,
	ButtonSwitcherBtnItemsContainer,
	ButtonSwitcherBtnItemsContainerPremiumBanner,
	SwitcherButtonItem,
	SwitcherButtonPremiumItem,
	SwitcherImageItem,
	SwitcherImageItemsContainer
} from "~/solidJs/shared/ui";
import { CopyBtn, CopyBtnV2 } from "~/solidJs/shared/ui/molecules/CopyBtn/CopyBtn";
import { DropDownPicker } from "~/solidJs/shared/ui/molecules/DropDown/DropDownPicker";
import type { btnSizes, btnVariants } from "./Button";
import { Button, ButtonExtraBold } from "./Button";

const BUTTON_COLOR_VARIANTS = [
	"actionviolent",
	"basic",
	"premium",
	"hoverMenu",
	"premiumOutline",
	"outline",
	"dark",
	"opacity",
	"headerButton",
	"iconContainer",
	"plain",
	"TertiaryAccent",
	"TertiaryNeutral",
	"TertiaryOverlay",
	"SecondaryAccent",
	"SecondaryNeutral",
	"TertiaryNeutralIcon",
	"SecondaryOverlay",
	"PrimaryAccent",
	"PrimaryIcon",
	"DangerOverlay",
	"ButtonPremium",
	"ButtonFooter",
	"FlexButtonSecondary",
	"FlexButtonPrimary",
	"AccentIcon",
	"OverlayIcon",
	"SecondaryNeutralIcon",
	"Ghost",
	"ButtonNode"
] as const satisfies readonly NonNullable<btnVariants>[];

const BUTTON_SIZES = [
	"small",
	"medium",
	"large"
] as const satisfies readonly NonNullable<btnSizes>[];

const needsDarkStrip = (v: NonNullable<btnVariants>) =>
	["opacity", "headerButton", "Ghost", "OverlayIcon", "AccentIcon"].includes(v);

const needsPlainOutline = (v: NonNullable<btnVariants>) => v === "plain";

const buttonStylesDoc = [
	{
		name: "Button — Base",
		description: "Shared foundation for all Button variants (tailwind-variants `buttonStyles`)",
		entries: [
			{ property: "display", value: "inline-flex", tailwindClass: "inline-flex" },
			{ property: "align-items", value: "center", tailwindClass: "items-center" },
			{ property: "justify-content", value: "center", tailwindClass: "justify-center" },
			{ property: "gap", value: "4px", tailwindClass: "gap-1" },
			{
				property: "border-radius (default)",
				value: "8px",
				tailwindClass: "rounded-lg",
				description: "Base radius before variant overrides"
			},
			{ property: "outline", value: "none", tailwindClass: "outline-none" },
			{ property: "transition", value: "colors", tailwindClass: "transition-colors" }
		]
	},
	{
		name: "Button — Size: small",
		entries: [
			{ property: "padding", value: "12px 8px", tailwindClass: "px-3 py-2" },
			{
				property: "font",
				value: "12px / 16px medium",
				tailwindClass: "text-xs font-medium leading-4"
			}
		]
	},
	{
		name: "Button — Size: medium",
		entries: [
			{ property: "padding", value: "10px 12px", tailwindClass: "px-3 py-2.5" },
			{ property: "font-size", value: "14px", tailwindClass: "text-sm" }
		]
	},
	{
		name: "Button — Size: large",
		entries: [
			{
				property: "border-radius",
				value: "6px",
				tailwindClass: "rounded-md",
				description: "Overrides base rounded-lg"
			},
			{ property: "padding", value: "12px 28px", tailwindClass: "px-7 py-3" },
			{
				property: "font",
				value: "14px / 16px medium",
				tailwindClass: "text-sm font-medium leading-4"
			}
		]
	},
	{
		name: "Button — Rounding map (by variant)",
		description: "Effective corner radius highlights; many variants add their own `rounded-*`",
		entries: [
			{
				property: "rounded-lg",
				value: "8px",
				tailwindClass: "rounded-lg",
				description: "Default base"
			},
			{
				property: "rounded-md",
				value: "6px",
				tailwindClass: "rounded-md",
				description: "size: large"
			},
			{
				property: "rounded-xl",
				value: "12px",
				tailwindClass: "rounded-xl",
				description: "ButtonExtraBold"
			},
			{
				property: "rounded-full",
				value: "9999px",
				tailwindClass: "rounded-full",
				description: "icons / premium / node"
			},
			{
				property: "rounded-sm",
				value: "2px",
				tailwindClass: "rounded-sm",
				description: "FlexButton*"
			},
			{
				property: "rounded-1.5",
				value: "6px (custom)",
				tailwindClass: "rounded-1.5",
				description: "PrimaryIcon"
			},
			{
				property: "Ghost + small",
				value: "6px",
				tailwindClass: "rounded-md",
				description: "compound variant"
			}
		]
	},
	{
		name: "Button — PrimaryAccent",
		entries: [
			{
				property: "background",
				value: "var(--interaction-violet)",
				tailwindClass: "bg-interaction-violet"
			},
			{ property: "color", value: "#FFFFFF", tailwindClass: "text-white" },
			{ property: "border-radius", value: "6px", tailwindClass: "rounded-md" },
			{
				property: "background:hover",
				value: "var(--interaction-violet-hv)",
				tailwindClass: "hover:bg-interaction-violet-hv"
			}
		]
	},
	{
		name: "Button — TertiaryOverlay",
		entries: [
			{
				property: "background",
				value: "var(--interaction-grey-light)",
				tailwindClass: "bg-interaction-grey-light"
			},
			{ property: "color", value: "var(--text-primary)", tailwindClass: "text-text-primary" },
			{
				property: "background:hover",
				value: "var(--interaction-grey-light-hv)",
				tailwindClass: "hover:bg-interaction-grey-light-hv"
			}
		]
	},
	{
		name: "Button — DangerOverlay",
		entries: [
			{
				property: "background",
				value: "var(--status-error)",
				tailwindClass: "bg-status-error"
			},
			{
				property: "color",
				value: "var(--status-accent-error)",
				tailwindClass: "text-status-accent-error"
			}
		]
	},
	{
		name: "ButtonExtraBold — Base",
		description: "Separate `buttonExtaBoldStyles` preset",
		entries: [
			{ property: "font", value: "17px medium", tailwindClass: "typography-text-17-medium" },
			{ property: "border-radius", value: "12px", tailwindClass: "rounded-xl" },
			{ property: "padding", value: "20px 28px", tailwindClass: "px-7 py-5" },
			{ property: "border", value: "none", tailwindClass: "border-none" }
		]
	},
	{
		name: "ButtonExtraBold — Primary",
		entries: [
			{
				property: "background",
				value: "var(--interaction-violet)",
				tailwindClass: "bg-interaction-violet"
			},
			{ property: "color", value: "#FFFFFF", tailwindClass: "text-white" }
		]
	},
	{
		name: "Button — Disabled / Pending",
		entries: [
			{
				property: "disabled",
				value: "pointer-events-none opacity-50",
				tailwindClass: "pointer-events-none opacity-50"
			},
			{
				property: "pending",
				value: "shimmer gradient",
				tailwindClass: "animate-shimmer bg-gradient-to-r …",
				description: "Loading skeleton treatment"
			}
		]
	},
	{
		name: "ButtonSwitcherBtnItemsContainer",
		entries: [
			{ property: "display", value: "flex", tailwindClass: "flex" },
			{ property: "width", value: "max-content", tailwindClass: "w-max" },
			{ property: "border-radius", value: "6px", tailwindClass: "rounded-md" },
			{ property: "border", value: "1px #DFD4FE", tailwindClass: "border-1 border-[#DFD4FE]" }
		]
	},
	{
		name: "SwitcherButtonItem",
		description: "Uses `Button` with fixed width and violet selected state",
		entries: [
			{ property: "width", value: "150px", tailwindClass: "w-[150px]" },
			{
				property: "selected background",
				value: "#9570FC",
				tailwindClass: "bg-[#9570FC] color-white"
			}
		]
	},
	{
		name: "SwitcherButtonPremiumItem + Premium container",
		entries: [
			{
				property: "container",
				value: "rounded-full bg-white p-1",
				tailwindClass: "rounded-full bg-white p-1"
			},
			{
				property: "selected",
				value: "violet→fuchsia gradient",
				tailwindClass: "bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-500"
			}
		]
	},
	{
		name: "SwitcherImageItem",
		description:
			"With `childrenComponent`, pass an absolutely positioned overlay (see `LayoutDataEntryEnumFeature` `.imageTextContainer`); otherwise children render in a bottom `span`",
		entries: [
			{ property: "opacity (idle)", value: "0.4", tailwindClass: "opacity-40" },
			{
				property: "selected",
				value: "bg-image-gradient, opacity 1",
				tailwindClass: "bg-image-gradient opacity-1"
			}
		]
	},
	{
		name: "CopyBtn",
		description: "Wraps `Button` variant hoverMenu, size medium; flash success icon",
		entries: [
			{
				property: "base",
				value: "Button hoverMenu + medium",
				tailwindClass: "variant hoverMenu"
			}
		]
	},
	{
		name: "CopyBtnV2",
		description: "Plain underlined trigger + Ark Tooltip for feedback",
		entries: [
			{
				property: "trigger",
				value: "Button variant plain",
				tailwindClass: "variant plain underline"
			},
			{
				property: "tooltip",
				value: "rounded-md bg #2D2D2E",
				tailwindClass: "rounded-md bg-[#2D2D2E]"
			}
		]
	},
	{
		name: "DropDownPickerContainer",
		description: "Opens list; label row uses `Button` (default variant dark)",
		entries: [
			{
				property: "trigger layout",
				value: "flex row full width",
				tailwindClass: "flex w-full flex-row"
			}
		]
	}
];

const SectionTitle = (props: { children: string }) => (
	<h2 class="typography-text-17-medium mb-3 text-text-primary">{props.children}</h2>
);

const VariantLabel = (props: { text: string }) => (
	<div class="label-10-medium mb-1 truncate text-text-tertiary">{props.text}</div>
);

const switcherModes = [
	{ label: "Videos", value: "Video" as const },
	{ label: "Docs", value: "Docs" as const }
];

const imgPickerSvg = (t: string, fill: string) =>
	`data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" rx="8" fill="${fill}"/><text x="80" y="58" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif">${t}</text></svg>`
	)}`;

const imagePickerItems = [
	{ imgUrl: imgPickerSvg("A", "#7C4AE7"), name: "Preset A", description: "Cool tones" },
	{ imgUrl: imgPickerSvg("B", "#38CD62"), name: "Preset B", description: "Warm tones" }
];

const ButtonSwitcherDefaultDemo = () => {
	const [active, setActive] = createSignal(0);
	return (
		<ButtonSwitcherBtnItemsContainer>
			<ButtonSwitcher values={switcherModes} activeIndex={active()}>
				{(sp) => (
					<SwitcherButtonItem
						isSelected={sp.isSelected()}
						onClick={() => setActive(sp.index())}
					>
						{sp.item().label}
					</SwitcherButtonItem>
				)}
			</ButtonSwitcher>
		</ButtonSwitcherBtnItemsContainer>
	);
};

const ButtonSwitcherPremiumDemo = () => {
	const [active, setActive] = createSignal(0);
	return (
		<ButtonSwitcherBtnItemsContainerPremiumBanner>
			<ButtonSwitcher values={switcherModes} activeIndex={active()}>
				{(sp) => (
					<SwitcherButtonPremiumItem
						isSelected={sp.isSelected()}
						onClick={() => setActive(sp.index())}
					>
						{sp.item().label}
					</SwitcherButtonPremiumItem>
				)}
			</ButtonSwitcher>
		</ButtonSwitcherBtnItemsContainerPremiumBanner>
	);
};

const ButtonSwitcherImageDemo = () => {
	const [active, setActive] = createSignal(0);
	return (
		<SwitcherImageItemsContainer>
			<ButtonSwitcher values={imagePickerItems} activeIndex={active()}>
				{(sp) => (
					<SwitcherImageItem
						class="h-[100px] min-w-[120px] max-w-[160px] overflow-hidden"
						isSelected={sp.isSelected()}
						imageSrc={sp.item().imgUrl}
						onClick={() => setActive(sp.index())}
						childrenComponent
					>
						{/* Same pattern as LayoutDataEntryEnumFeature `.imageTextContainer`: absolute overlay */}
						<div class="absolute top-0 left-0 flex h-full w-full flex-col justify-between p-2 pl-2.5 text-white">
							<span class="caption-12-semibold drop-shadow-sm">{sp.item().name}</span>
							<span class="caption-11-regular pr-2 drop-shadow-sm">
								{sp.item().description}
							</span>
						</div>
					</SwitcherImageItem>
				)}
			</ButtonSwitcher>
		</SwitcherImageItemsContainer>
	);
};

const DropDownPickerDemo = () => {
	const values = ["Apple", "Banana", "Cherry"] as const;
	const [active, setActive] = createSignal(0);
	return (
		<div class="w-64">
			<DropDownPicker
				mode="singleSelect"
				values={[...values]}
				getActiveIndex={active()}
				setActiveIndex={(idx, _vals) => setActive(idx)}
				labelComponent={(item) => <span class="caption-12-medium text-white">{item}</span>}
			>
				{(item) => <span class="caption-12-regular">{item()}</span>}
			</DropDownPicker>
		</div>
	);
};

const meta: Meta<typeof Button> = {
	title: "Atoms/Button",
	component: Button,
	parameters: {
		layout: "padded",
		componentStyles: buttonStylesDoc
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj;

export const AllButtonsShowcase: Story = {
	name: "All buttons — sizes, radii, types",
	render: () => (
		<div class="flex max-w-6xl flex-col gap-10 pb-16">
			<div>
				<SectionTitle>Sizes (variant: PrimaryAccent)</SectionTitle>
				<div class="flex flex-wrap items-end gap-4">
					<For each={[...BUTTON_SIZES]}>
						{(size) => (
							<div class="flex flex-col items-start gap-1">
								<VariantLabel text={`size="${size}"`} />
								<Button variant="PrimaryAccent" size={size}>
									Label
								</Button>
							</div>
						)}
					</For>
				</div>
			</div>

			<div>
				<SectionTitle>Rounding examples</SectionTitle>
				<div class="flex flex-wrap gap-4">
					<div class="flex flex-col gap-1">
						<VariantLabel text="rounded-lg (base) — TertiaryAccent" />
						<Button variant="TertiaryAccent" size="small">
							Base radius
						</Button>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="rounded-md — PrimaryAccent / large" />
						<Button variant="PrimaryAccent" size="large">
							Large
						</Button>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="rounded-full — ButtonPremium" />
						<Button variant="ButtonPremium" size="large">
							Premium
						</Button>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="rounded-sm — FlexButtonPrimary" />
						<Button variant="FlexButtonPrimary" size="medium">
							Flex
						</Button>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="rounded-xl — ButtonExtraBold" />
						<ButtonExtraBold variant="Primary">Extra bold</ButtonExtraBold>
					</div>
				</div>
			</div>

			<div>
				<SectionTitle>All variants (size: small)</SectionTitle>
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
					<For each={[...BUTTON_COLOR_VARIANTS]}>
						{(variant) => (
							<div
								class="rounded-lg border border-border-secondary p-2"
								classList={{
									"bg-[#2D2D2D]": needsDarkStrip(variant),
									"ring-1 ring-border-secondary": needsPlainOutline(variant)
								}}
							>
								<VariantLabel text={variant} />
								<Button variant={variant} size="small">
									Label
								</Button>
							</div>
						)}
					</For>
				</div>
			</div>

			<div>
				<SectionTitle>ButtonExtraBold — types</SectionTitle>
				<div class="flex flex-wrap gap-4">
					<For each={["Primary", "Secondary", "Tertiary"] as const}>
						{(variant) => (
							<div class="flex flex-col gap-1">
								<VariantLabel text={`variant="${variant}"`} />
								<ButtonExtraBold variant={variant}>Continue</ButtonExtraBold>
							</div>
						)}
					</For>
					<div class="flex flex-col gap-1">
						<VariantLabel text="disabled" />
						<ButtonExtraBold variant="Primary" disabled>
							Disabled
						</ButtonExtraBold>
					</div>
				</div>
			</div>

			<div>
				<SectionTitle>States — disabled & pending</SectionTitle>
				<div class="flex flex-wrap gap-4">
					<div class="flex flex-col gap-1">
						<VariantLabel text="PrimaryAccent disabled" />
						<Button variant="PrimaryAccent" disabled>
							Disabled
						</Button>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="TertiaryOverlay pending" />
						<Button variant="TertiaryOverlay" pending>
							Pending
						</Button>
					</div>
				</div>
			</div>

			<div>
				<SectionTitle>ButtonSwitcher — default + SwitcherButtonItem</SectionTitle>
				<ButtonSwitcherDefaultDemo />
			</div>

			<div>
				<SectionTitle>ButtonSwitcher — premium (rounded)</SectionTitle>
				<ButtonSwitcherPremiumDemo />
			</div>

			<div>
				<SectionTitle>ButtonSwitcher — image cards (SwitcherImageItem)</SectionTitle>
				<div class="max-w-xl">
					<ButtonSwitcherImageDemo />
				</div>
			</div>

			<div>
				<SectionTitle>CopyBtn & CopyBtnV2</SectionTitle>
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1">
						<VariantLabel text="CopyBtn (default labels)" />
						<CopyBtn onClick={() => undefined}>Copy</CopyBtn>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="CopyBtn — changeTextOnAction" />
						<CopyBtn
							changeTextOnAction
							needsAction="Click to copy"
							onClick={() => undefined}
						/>
					</div>
					<div class="flex flex-col gap-1">
						<VariantLabel text="CopyBtnV2 (tooltip)" />
						<div class="pt-6">
							<CopyBtnV2 onClick={() => undefined}>Copy link</CopyBtnV2>
						</div>
					</div>
				</div>
			</div>

			<div>
				<SectionTitle>DropDownPicker (singleSelect)</SectionTitle>
				<p class="caption-12-regular mb-2 text-text-secondary">
					Uses Button as trigger + ButtonSwitcher list items.
				</p>
				<DropDownPickerDemo />
			</div>
		</div>
	)
};
