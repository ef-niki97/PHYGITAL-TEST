import { type Assign, createListCollection, type HTMLProps, Select } from "@ark-ui/solid";
import { Check, ChevronDown } from "lucide-solid";
import type { Component, ComponentProps, JSXElement } from "solid-js";
import { Dynamic, For, Match, Portal, Show, Switch } from "solid-js/web";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const styles = tv(
	{
		base: "select",
		defaultVariants: { size: "md", variant: "default" },
		slots: {
			label: "select__label",
			positioner: "select__positioner z-[1000]",
			trigger: "select__trigger",
			indicator: "select__indicator",
			clearTrigger: "select__clearTrigger",
			item: "select__item flex cursor-pointer items-center justify-between",
			itemText: "select__itemText",
			itemIndicator: "select__itemIndicator",
			itemGroup: "select__itemGroup",
			itemGroupLabel: "select__itemGroupLabel",
			content:
				"select__content z-[1000] flex max-h-96 flex-col overflow-auto rounded-md bg-white p-2 outline-none data-[state=open]:animate-fadeIn",
			root: "select__root",
			control: "select__control",
			valueText: "select__valueText",
			list: "select__list"
		},
		variants: {
			variant: {
				default: {
					label: "select__label--variant_outline",
					positioner: "select__positioner--variant_outline",
					trigger:
						"typography-text-14-medium -outline-offset-1 flex items-center justify-center gap-1.5 rounded-lg border-none px-2 py-1 text-text-primary outline-none hover:bg-interaction-grey-light-hv data-[state=open]:bg-interaction-grey-light-hv data-[state=open]:outline data-[state=open]:outline-1 data-[state=open]:outline-border-secondary",
					indicator: "select__indicator--variant_outline",
					clearTrigger: "select__clearTrigger--variant_outline",
					item: "flex gap-0.5 rounded-lg bg-transparent p-2 hover:bg-interaction-white-hv data-[highlighted]:bg-interaction-white-hv",
					itemText: "typography-text-14-medium text-text-secondary-v2",
					itemIndicator: "select__itemIndicator--variant_outline",
					itemGroup: "select__itemGroup--variant_outline",
					itemGroupLabel: "select__itemGroupLabel--variant_outline",
					content: "rounded-2xl border border-border-secondary bg-white p-3 shadow-lg",
					root: "select__root--variant_outline",
					control: "select__control--variant_outline",
					valueText: "select__valueText--variant_outline",
					list: "select__list--variant_outline"
				},
				ghost: {
					label: "select__label--variant_ghost",
					positioner: "select__positioner--variant_ghost",
					trigger: "select__trigger--variant_ghost",
					indicator: "select__indicator--variant_ghost",
					clearTrigger: "select__clearTrigger--variant_ghost",
					item: "select__item--variant_ghost",
					itemText: "select__itemText--variant_ghost",
					itemIndicator: "select__itemIndicator--variant_ghost",
					itemGroup: "select__itemGroup--variant_ghost",
					itemGroupLabel: "select__itemGroupLabel--variant_ghost",
					content: "select__content--variant_ghost",
					root: "select__root--variant_ghost",
					control: "select__control--variant_ghost",
					valueText: "select__valueText--variant_ghost",
					list: "select__list--variant_ghost"
				}
			},
			size: {
				sm: {
					label: "select__label--size_md",
					positioner: "select__positioner--size_md",
					trigger: "caption-11-medium! gap-1.5 rounded-lg px-2 py-1",
					indicator: "select__indicator--size_md",
					clearTrigger: "select__clearTrigger--size_md",
					item: "select__item--size_md p-2",
					itemText: "select__itemText--size_md",
					itemIndicator: "select__itemIndicator--size_md",
					itemGroup: "select__itemGroup--size_md",
					itemGroupLabel: "select__itemGroupLabel--size_md",
					content: "select__content--size_md gap-2",
					root: "select__root--size_md",
					control: "select__control--size_md",
					valueText: "select__valueText--size_md",
					list: "select__list--size_md"
				},
				md: {
					label: "select__label--size_md",
					positioner: "select__positioner--size_md",
					trigger: "typography-text-14-medium gap-1.5 rounded-lg px-2 py-1",
					indicator: "select__indicator--size_md",
					clearTrigger: "select__clearTrigger--size_md",
					item: "select__item--size_md p-2",
					itemText: "select__itemText--size_md",
					itemIndicator: "select__itemIndicator--size_md",
					itemGroup: "select__itemGroup--size_md",
					itemGroupLabel: "select__itemGroupLabel--size_md",
					content: "select__content--size_md gap-2",
					root: "select__root--size_md",
					control: "select__control--size_md",
					valueText: "select__valueText--size_md",
					list: "select__list--size_md"
				},
				lg: {
					label: "caption-13-medium text-text-secondary-v2",
					positioner: "select__positioner--size_md",
					trigger:
						"typography-text-14-medium gap-2 rounded-xl bg-interaction-grey-light px-3 py-2.5 hover:bg-interaction-grey-light-hv data-[state=open]:outline-border-tertiary",
					indicator: "select__indicator--size_md",
					clearTrigger: "select__clearTrigger--size_md",
					item: "select__item--size_md p-2",
					itemText: "select__itemText--size_md",
					itemIndicator: "select__itemIndicator--size_md",
					itemGroup: "select__itemGroup--size_md",
					itemGroupLabel: "select__itemGroupLabel--size_md",
					content: "select__content--size_md gap-2",
					root: "flex flex-col gap-2",
					control: "select__control--size_md",
					valueText: "select__valueText--size_md",
					list: "select__list--size_md"
				}
			}
		}
	},
	{ twMerge: true }
);
const { withRootProvider, withContext, withProvider } = createStyleContext(styles);
type SelectVariantProps = VariantProps<typeof styles>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<
		Assign<HTMLProps<"div">, Select.RootProviderBaseProps<Select.CollectionItem>>,
		SelectVariantProps
	>
>(Select.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, Select.RootProps<Select.CollectionItem>>, SelectVariantProps>
>(Select.Root, "root");

export const ClearTrigger = withContext<Assign<HTMLProps<"button">, Select.ClearTriggerBaseProps>>(
	Select.ClearTrigger,
	"clearTrigger"
);

export const Content = withContext<Assign<HTMLProps<"div">, Select.ContentBaseProps>>(
	Select.Content,
	"content"
);

export const Control = withContext<Assign<HTMLProps<"div">, Select.ControlBaseProps>>(
	Select.Control,
	"control"
);

export const Indicator = withContext<Assign<HTMLProps<"div">, Select.IndicatorBaseProps>>(
	Select.Indicator,
	"indicator"
);

export const ItemGroupLabel = withContext<Assign<HTMLProps<"div">, Select.ItemGroupLabelBaseProps>>(
	Select.ItemGroupLabel,
	"itemGroupLabel"
);

export const ItemGroup = withContext<Assign<HTMLProps<"div">, Select.ItemGroupBaseProps>>(
	Select.ItemGroup,
	"itemGroup"
);

export const ItemIndicator = withContext<Assign<HTMLProps<"div">, Select.ItemIndicatorBaseProps>>(
	Select.ItemIndicator,
	"itemIndicator"
);

export const Item = withContext<Assign<HTMLProps<"div">, Select.ItemBaseProps>>(
	Select.Item,
	"item"
);

export const ItemText = withContext<Assign<HTMLProps<"span">, Select.ItemTextBaseProps>>(
	Select.ItemText,
	"itemText"
);

export const Label = withContext<Assign<HTMLProps<"label">, Select.LabelBaseProps>>(
	Select.Label,
	"label"
);

export const List = withContext<Assign<HTMLProps<"div">, Select.ListBaseProps>>(
	Select.List,
	"list"
);

export const Positioner = withContext<Assign<HTMLProps<"div">, Select.PositionerBaseProps>>(
	Select.Positioner,
	"positioner"
);

export const Trigger = withContext<Assign<HTMLProps<"button">, Select.TriggerBaseProps>>(
	Select.Trigger,
	"trigger"
);

export const ValueText = withContext<Assign<HTMLProps<"span">, Select.ValueTextBaseProps>>(
	Select.ValueText,
	"valueText"
);

export {
	SelectContext as Context,
	SelectHiddenSelect as HiddenSelect
} from "@ark-ui/solid";

export type SelectClosedItem = {
	label: string;
	value: string;
	subtitle?: string;
	icon?: Component<ComponentProps<"svg">>;
	avatar?: string;
	disabled?: boolean;
	group?: string;
	onSelect?: Select.ItemProps["onSelect"];
	as?: Component<ComponentProps<"div">>;
};

export interface SelectClosedComponentProps<T extends SelectClosedItem> {
	items: T[];
	defaultValue?: T | T[];
	value?: T[];
	rootProps?: Assign<Partial<Select.RootProps<T>>, SelectVariantProps>;
	triggerProps?: ComponentProps<typeof Trigger> & { [key: `data-${string}`]: string | undefined };
	contentProps?: ComponentProps<"div">;
	placeholder?: JSXElement;
	renderValue?: Component;
	label?: JSXElement;
}

export const SelectClosedComponent = <T extends SelectClosedItem>(
	props: SelectClosedComponentProps<T>
) => {
	const collection = () =>
		createListCollection({
			items: props.items
		});

	return (
		<Root
			{...(props.rootProps || {})}
			collection={collection()}
			value={props.value?.map((item) => item.value)}
		>
			<Show when={props.label}>
				<Label>{props.label}</Label>
			</Show>
			<Control translate="no">
				<Trigger translate="no" {...(props.triggerProps || {})}>
					<Switch>
						<Match when={props.renderValue}>
							<Dynamic component={props.renderValue} />
						</Match>
						<Match when={!props.value?.length}>{props.placeholder}</Match>
						<Match when={props.value?.length}>
							{props.value?.map((item) => item.label).join(", ")}
						</Match>
					</Switch>
					<Indicator class="data-[state=open]:rotate-180">
						<ChevronDown size={16} class="text-text-secondary" />
					</Indicator>
				</Trigger>
			</Control>

			<Portal>
				<Positioner>
					<Content {...(props.contentProps || {})}>
						<For each={collection().items}>
							{(item, index) => (
								<Item
									translate="no"
									item={item}
									onSelect={item.onSelect}
									data-test={`select-option-${index() + 1}`}
									{...(item.as
										? {
												asChild: (p) => (
													<Dynamic component={item.as} {...p()} />
												)
											}
										: {})}
								>
									<div class="flex items-center gap-2">
										<Show when={item.icon} keyed>
											{(icon) => (
												<div class="rounded-lg bg-background-gray-light p-2">
													<Dynamic component={icon} class={"size-4"} />
												</div>
											)}
										</Show>
										<ItemText>{item.label}</ItemText>
									</div>
									<ItemIndicator>
										<Check size={24} class="text-text-secondary" />
									</ItemIndicator>
								</Item>
							)}
						</For>
					</Content>
				</Positioner>
			</Portal>

			<Select.HiddenSelect />
		</Root>
	);
};
