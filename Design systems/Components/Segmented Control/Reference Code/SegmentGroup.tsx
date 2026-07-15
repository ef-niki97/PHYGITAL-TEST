import { type Assign, type HTMLProps, SegmentGroup } from "@ark-ui/solid";
import type { Component, ComponentProps, JSXElement } from "solid-js";
import { For, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";
import type { ElementType } from "~/solidJs/shared/helpers/types";

const styles = tv(
	{
		base: "segmentGroup",
		defaultVariants: { size: "sm", variant: "rounded" },
		slots: {
			root: "flex items-center",
			label: "segmentGroup__label",
			item: "relative cursor-pointer transition-all duration-200",
			itemText: "transition-colors duration-200",
			itemControl: "-z-10 absolute inset-0 transition-all duration-200",
			indicator: "absolute transition-all duration-200 ease-in-out"
		},
		variants: {
			size: {
				sm: {
					root: "",
					item: "",
					itemText: "",
					itemControl: "",
					indicator: ""
				},
				lg: {
					root: "",
					item: "",
					itemText: "",
					itemControl: "",
					indicator: ""
				}
			},
			variant: {
				rounded: {
					root: "rounded-[40px] border border-interaction-violet bg-white p-0.5",
					item: "flex h-8 items-center justify-center rounded-[40px] px-4 py-3 text-text-primary data-[state=checked]:bg-interaction-violet data-[state=checked]:text-white data-[state=checked]:hover:bg-interaction-violet-hv",
					itemText: "typography-text-16-medium",
					itemControl: "rounded-[40px] data-[state=checked]:bg-interaction-violet",
					indicator: "hidden"
				},
				square: {
					root: "gap-1 rounded-xl bg-interaction-grey-light p-1",
					item: "flex items-center justify-center rounded-[10px] px-4 py-3 text-text-secondary-v2 hover:bg-interaction-grey-light-hv data-[state=checked]:bg-white data-[state=checked]:text-interaction-violet",
					itemText: "caption-13-medium",
					itemControl: "rounded-[10px] data-[state=checked]:bg-white",
					indicator: "hidden"
				},
				line: {
					root: "gap-0 bg-transparent",
					item: "border-border-tertiary border-b px-2 py-2 text-text-tertiary data-[state=checked]:border-background-violet data-[state=checked]:text-interaction-violet",
					itemText: "",
					itemControl: "hidden",
					indicator: "hidden"
				}
			}
		},
		compoundVariants: [
			{
				variant: "line",
				size: "sm",
				class: {
					item: "border-b-[1.5px]",
					itemText: "caption-12-medium"
				}
			},
			{
				variant: "line",
				size: "lg",
				class: {
					item: "border-b-[1.5px]",
					itemText: "caption-13-medium"
				}
			}
		]
	},
	{ twMerge: true }
);
const { withProvider, withContext, withRootProvider } = createStyleContext(styles);
export type SegmentGroupVariantProps = VariantProps<typeof styles>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<Assign<HTMLProps<"div">, SegmentGroup.RootProviderProps>, SegmentGroupVariantProps>
>(SegmentGroup.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, SegmentGroup.RootProps>, SegmentGroupVariantProps>
>(SegmentGroup.Root, "root");

export const Indicator = withContext<Assign<HTMLProps<"div">, SegmentGroup.IndicatorBaseProps>>(
	SegmentGroup.Indicator,
	"indicator"
);

export const ItemControl = withContext<Assign<HTMLProps<"div">, SegmentGroup.ItemControlBaseProps>>(
	SegmentGroup.ItemControl,
	"itemControl"
);

export const Item = withContext<Assign<HTMLProps<"label">, SegmentGroup.ItemBaseProps>>(
	SegmentGroup.Item,
	"item"
);

export const ItemText = withContext<Assign<HTMLProps<"span">, SegmentGroup.ItemTextBaseProps>>(
	SegmentGroup.ItemText,
	"itemText"
);

export const Label = withContext<Assign<HTMLProps<"label">, SegmentGroup.LabelBaseProps>>(
	SegmentGroup.Label,
	"label"
);

export {
	SegmentGroupContext as Context,
	SegmentGroupItemHiddenInput as ItemHiddenInput
} from "@ark-ui/solid";

export type ClosedSegmentGroupItem = {
	label?: string;
	value: string;
	renderItem?: <E extends ElementType>(props: ComponentProps<E>) => JSXElement;
	disabled?: boolean;
};

export interface SegmentGroupClosedComponentProps extends SegmentGroupVariantProps {
	items: Array<ClosedSegmentGroupItem>;
	value?: string;
	rootProps?: SegmentGroup.RootProps & Record<`data-${string}`, string>;
	rootClass?: string;
}

export const RenderClosedItem: Component<ClosedSegmentGroupItem> = (props) => {
	return (
		<Switch
			fallback={
				<Item value={props.value} disabled={props.disabled}>
					<ItemControl />
					<ItemText>{props.label}</ItemText>
					<SegmentGroup.ItemHiddenInput />
				</Item>
			}
		>
			<Match when={props.renderItem} keyed>
				{(RenderFc) => (
					<Item
						value={props.value}
						disabled={props.disabled}
						asChild={(p) => <Dynamic component={RenderFc} {...p()} />}
					>
						<ItemControl />
						<ItemText>{props.label}</ItemText>
						<SegmentGroup.ItemHiddenInput />
					</Item>
				)}
			</Match>
		</Switch>
	);
};

export const SegmentGroupClosedComponent: Component<SegmentGroupClosedComponentProps> = (props) => {
	return (
		<Root
			{...(props.rootProps ? props.rootProps : {})}
			value={props.value}
			size={props.size}
			variant={props.variant}
			class={twMerge(props.rootClass)}
		>
			<For each={props.items}>{(item) => <RenderClosedItem {...item} />}</For>
			<Indicator />
		</Root>
	);
};
