import type { Component, ComponentProps, JSXElement } from "solid-js";
import { For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import { TooltipClosedComponent } from "./Tooltip";

const tooltipStyles = [
	{
		name: "Content (Tooltip Body)",
		description: "The tooltip popup container with text content",
		entries: [
			{
				property: "font-size",
				value: "11px",
				tailwindClass: "caption-11-regular",
				description: "Caption typography preset"
			},
			{ property: "z-index", value: "999", tailwindClass: "z-[999]" },
			{ property: "display", value: "flex", tailwindClass: "flex" },
			{ property: "flex-direction", value: "column", tailwindClass: "flex-col" },
			{ property: "max-height", value: "24rem (384px)", tailwindClass: "max-h-96" },
			{ property: "overflow", value: "auto", tailwindClass: "overflow-auto" },
			{ property: "border-radius", value: "16px", tailwindClass: "rounded-[16px]" },
			{ property: "background-color", value: "#2D2D2E", tailwindClass: "bg-[#2D2D2E]" },
			{ property: "padding", value: "6px 10px", tailwindClass: "px-2.5 py-1.5" },
			{ property: "color", value: "#FFFFFF", tailwindClass: "text-white" },
			{
				property: "box-shadow",
				value: "0 10px 15px -3px rgba(0,0,0,.1)",
				tailwindClass: "shadow-lg"
			},
			{ property: "outline", value: "none", tailwindClass: "outline-none" }
		]
	},
	{
		name: "Positioner",
		description: "Positioning wrapper around the tooltip content",
		entries: [{ property: "z-index", value: "999", tailwindClass: "z-[999]" }]
	},
	{
		name: "Arrow Tip",
		description: "The arrow/caret pointing to the trigger element",
		entries: [
			{
				property: "color",
				value: "#2D2D2E",
				tailwindClass: "text-[#2D2D2E]",
				description: "Matches tooltip background"
			},
			{
				property: "--arrow-size",
				value: "20px",
				description: "CSS custom property for arrow dimensions"
			},
			{ property: "transform", value: "rotate(315deg)", tailwindClass: "rotate-[315deg]" }
		]
	},
	{
		name: "Tooltip (Legacy Variant)",
		description: "Older tooltip component used in some legacy contexts",
		entries: [
			{ property: "font-size", value: "0.4rem (6.4px)" },
			{ property: "background-color", value: "#000000" },
			{ property: "color", value: "#FFFFFF" },
			{ property: "border-radius", value: "5px" },
			{ property: "padding", value: "7px 13px" }
		]
	},
	{
		name: "Timing & Behavior",
		entries: [
			{ property: "open-delay", value: "0ms", description: "No delay when hovering trigger" },
			{ property: "close-delay", value: "0ms", description: "No delay when leaving trigger" },
			{ property: "placement", value: "top", description: "Default position above trigger" },
			{
				property: "lazy-mount",
				value: "true",
				description: "Content mounted only when shown"
			},
			{
				property: "unmount-on-exit",
				value: "true",
				description: "Content removed from DOM when hidden"
			}
		]
	}
];

const meta: Meta<typeof TooltipClosedComponent> = {
	title: "Atoms/TooltipClosedComponent",
	component: TooltipClosedComponent,
	parameters: {
		layout: "fullscreen",
		componentStyles: tooltipStyles
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj<typeof TooltipClosedComponent>;

const TriggerButton = (props: ComponentProps<"button">) => (
	<button
		{...props}
		class="caption-13-medium rounded-lg bg-interaction-violet px-4 py-2 text-white hover:bg-interaction-violet-hv"
	>
		Hover me
	</button>
);

const IconTrigger = (props: ComponentProps<"button">) => (
	<button
		{...props}
		class="flex h-8 w-8 items-center justify-center rounded-full bg-background-gray-light text-text-secondary hover:bg-interaction-grey-light-hv"
	>
		<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
			<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
			<text
				x="8"
				y="12"
				text-anchor="middle"
				fill="currentColor"
				font-size="10"
				font-weight="600"
			>
				?
			</text>
		</svg>
	</button>
);

const RichContent = () => (
	<div class="flex flex-col gap-1">
		<span class="caption-12-semibold">Pro Feature</span>
		<span class="caption-11-regular text-gray-400">Upgrade your plan to unlock</span>
	</div>
);

const LONG_TEXT =
	"This is a much longer tooltip text that demonstrates how the tooltip handles multi-line content and wraps gracefully";

const PLACEMENTS = ["top", "bottom", "left", "right"] as const;
type Placement = (typeof PLACEMENTS)[number];

interface VariantColumn {
	id: string;
	header: string;
	content: JSXElement;
	showArrow?: boolean;
	trigger?: Component<ComponentProps<"button">>;
}

const VARIANT_COLUMNS: VariantColumn[] = [
	{ id: "default", header: "default", content: "This is a tooltip" },
	{ id: "withArrow", header: "showArrow", content: "Tooltip with arrow", showArrow: true },
	{ id: "long", header: "long content", content: LONG_TEXT },
	{ id: "rich", header: "rich content", content: <RichContent /> },
	{ id: "icon", header: "icon trigger", content: "Help information", trigger: IconTrigger }
];

interface CellProps {
	placement: Placement;
	column: VariantColumn;
}

const TooltipCell = (props: CellProps) => (
	<div class="flex items-center justify-center p-4">
		<TooltipClosedComponent
			content={props.column.content}
			showArrow={props.column.showArrow}
			rootProps={{ positioning: { placement: props.placement } }}
			portaled={false}
		>
			{props.column.trigger ?? TriggerButton}
		</TooltipClosedComponent>
	</div>
);

export const AllTooltipsShowcase: Story = {
	name: "All tooltips — unified table",
	render: () => (
		<div class="w-full overflow-x-auto p-4">
			<table class="w-full min-w-[1180px] border-collapse text-left">
				<thead>
					<tr class="border-border-secondary border-b">
						<th class="caption-12-medium w-40 p-3 text-text-secondary">
							placement / variant
						</th>
						<For each={VARIANT_COLUMNS}>
							{(column) => (
								<th class="caption-12-medium p-3 text-text-secondary">
									{column.header}
								</th>
							)}
						</For>
					</tr>
				</thead>
				<tbody>
					<For each={PLACEMENTS}>
						{(placement) => (
							<tr class="border-border-secondary border-b align-middle">
								<td class="p-3 font-mono text-2xs text-text-primary">
									placement="{placement}"
								</td>
								<For each={VARIANT_COLUMNS}>
									{(column) => (
										<td class="p-3">
											<TooltipCell placement={placement} column={column} />
										</td>
									)}
								</For>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	)
};
