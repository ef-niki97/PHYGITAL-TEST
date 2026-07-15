import { type Assign, type HTMLProps, Select } from "@ark-ui/solid";
import { type Component, type ComponentProps, createMemo, For, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const selectClosed = tv(
	{
		base: "select-closed",
		defaultVariants: { size: "md", variant: "outline" },
		slots: {
			root: "select-closed__root",
			trigger:
				"select-closed__trigger flex items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
			valueText: "select-closed__value-text truncate text-gray-900",
			placeholder: "select-closed__placeholder text-gray-500",
			indicator: "select-closed__indicator flex-shrink-0",
			positioner: "select-closed__positioner z-[1000]",
			content:
				"select-closed__content z-[1000] max-h-96 min-w-[200px] overflow-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-lg data-[state=open]:animate-fadeIn",
			itemGroup: "select-closed__item-group flex flex-col gap-1",
			itemGroupLabel:
				"select-closed__item-group-label px-2 py-1 font-medium text-gray-600 text-xs",
			item: "select-closed__item flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50 data-[disabled]:cursor-not-allowed data-[highlighted]:bg-gray-50 data-[selected]:bg-blue-50 data-[disabled]:opacity-50",
			itemContent: "select-closed__item-content flex flex-1 items-center gap-2",
			itemAvatar:
				"select-closed__item-avatar flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100",
			itemTextBlock: "select-closed__item-text-block flex flex-1 flex-col gap-0.5",
			itemTitle: "select-closed__item-title font-medium text-gray-800 text-sm",
			itemSubtitle: "select-closed__item-subtitle text-gray-500 text-xs",
			itemIndicator: "select-closed__item-indicator h-5 w-5 flex-shrink-0 text-gray-400",
			clearTrigger: "select-closed__clear-trigger",
			control: "select-closed__control",
			label: "select-closed__label"
		},
		variants: {
			variant: {
				outline: {
					trigger:
						"border-gray-300 bg-white hover:bg-gray-50 focus:border-blue-500 focus:ring-blue-500",
					content: "border-gray-200 bg-white shadow-lg"
				},
				ghost: {
					trigger:
						"border-transparent bg-transparent hover:bg-gray-50 focus:bg-white focus:ring-blue-500",
					content: "border-gray-200 bg-white shadow-lg"
				}
			},
			size: {
				xs: {
					trigger: "px-2 py-1 text-xs",
					content: "gap-1 p-2",
					item: "px-2 py-1 text-xs",
					itemTitle: "text-xs",
					itemSubtitle: "text-2xs"
				},
				sm: {
					trigger: "px-2.5 py-1.5 text-sm",
					content: "gap-1 p-2.5",
					item: "px-2 py-1.5 text-sm",
					itemTitle: "text-sm",
					itemSubtitle: "text-xs"
				},
				md: {
					trigger: "px-3 py-2 text-sm",
					content: "gap-1 p-3",
					item: "px-2 py-2 text-sm",
					itemTitle: "text-sm",
					itemSubtitle: "text-xs"
				},
				lg: {
					trigger: "px-4 py-2.5 text-base",
					content: "gap-1.5 p-4",
					item: "px-3 py-2.5 text-base",
					itemTitle: "text-base",
					itemSubtitle: "text-sm"
				}
			}
		}
	},
	{ twMerge: true }
);

const { withRootProvider, withContext } = createStyleContext(selectClosed);

export type SelectClosedVariationProps = VariantProps<typeof selectClosed>;

export type SelectClosedItem<T = any> = {
	id: string;
	label: string;
	value: T;
	subtitle?: string;
	icon?: Component<ComponentProps<"svg">>;
	avatar?: string;
	disabled?: boolean;
	group?: string;
	renderItem?: Component<{ item: SelectClosedItem<T> }>;
};

export type SelectClosedGroup<T = unknown> = {
	id: string;
	label: string;
	items: SelectClosedItem<T>[];
};

export interface SelectClosedComponentProps<T = any> extends SelectClosedVariationProps {
	items: SelectClosedItem<T>[];
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	multiple?: boolean;
	clearable?: boolean;
	onSelectionChange?: (selectedItems: SelectClosedItem<T>[]) => void;
	defaultValue?: T | T[];
	value?: T | T[];
	rootProps?: Select.RootProps<SelectClosedItem<T>>;
	triggerProps?: ComponentProps<"button">;
	contentClass?: string;
	renderTrigger?: Component<{
		selectedItems: SelectClosedItem<T>[];
		placeholder?: string;
		isOpen: boolean;
	}>;
	renderItem?: Component<{ item: SelectClosedItem<T> }>;
	searchable?: boolean;
	maxHeight?: number;
}

export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<Select.RootProviderProps<SelectClosedItem>, SelectClosedVariationProps>
>(Select.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<
	Assign<Select.RootProps<SelectClosedItem>, SelectClosedVariationProps>
>(Select.Root);

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
	"itemTitle"
);

export const Label = withContext<Assign<HTMLProps<"label">, Select.LabelBaseProps>>(
	Select.Label,
	"label"
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

/**
 * Select component without Root wrapper - similar to DatePickerClosedComponent
 * Use with RootProvider to enable disabled accessor and other dynamic props
 */
export interface SelectClosedComponentWithoutRootProps<T = any> {
	items: SelectClosedItem<T>[];
	placeholder?: string;
	label?: string;
	triggerProps?: ComponentProps<typeof Trigger>;
	contentClass?: string;
	renderTrigger?: Component<{
		selectedItems: SelectClosedItem<T>[];
		placeholder?: string;
		isOpen: boolean;
	}>;
	renderItem?: Component<{ item: SelectClosedItem<T> }>;
	maxHeight?: number;
}

export const SelectClosedComponentWithoutRoot = <T = any>(
	props: SelectClosedComponentWithoutRootProps<T>
) => {
	return (
		<Select.Context>
			{(context) => {
				const selectedItems = createMemo(() => {
					const values = context().value;
					return props.items.filter((item) => values.includes(String(item.value)));
				});

				return (
					<>
						<Show when={props.label}>
							<Label>{props.label}</Label>
						</Show>

						<Control>
							<Trigger {...(props.triggerProps || {})}>
								<Show
									when={props.renderTrigger}
									keyed
									fallback={
										<>
											<ValueText
												placeholder={
													props.placeholder || "Select an option"
												}
												class={twMerge(
													selectedItems().length > 0
														? "text-gray-900"
														: "text-gray-500"
												)}
											>
												{selectedItems().length > 0
													? selectedItems()
															.map((item) => item.label)
															.join(", ")
													: props.placeholder || "Select an option"}
											</ValueText>
											<Indicator>
												<svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M4 6L8 10L12 6"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</Indicator>
										</>
									}
								>
									{(RenderTrigger) => (
										<div>
											<RenderTrigger
												selectedItems={selectedItems()}
												placeholder={props.placeholder}
												isOpen={context().open}
											/>
										</div>
									)}
								</Show>
							</Trigger>
						</Control>

						<Portal>
							<Positioner>
								<Content
									class={twMerge("select-closed__content", props.contentClass)}
									style={{
										"max-height": props.maxHeight
											? `${props.maxHeight}px`
											: "24rem"
									}}
								>
									<For each={props.items}>
										{(item, index) => (
											<Item
												item={item}
												class="select-closed__item"
												data-test={`select-option-${index() + 1}`}
											>
												<Show
													keyed
													when={props.renderItem || item.renderItem}
													fallback={
														<div class="select-closed__item-content">
															<Show when={item.icon || item.avatar}>
																<div class="select-closed__item-avatar">
																	<Show when={item.icon} keyed>
																		{(IconComponent) => (
																			<IconComponent class="h-4 w-4" />
																		)}
																	</Show>
																	<Show
																		when={
																			item.avatar &&
																			!item.icon
																		}
																	>
																		<img
																			src={item.avatar}
																			alt={item.label}
																			class="h-full w-full rounded object-cover"
																		/>
																	</Show>
																</div>
															</Show>
															<div class="select-closed__item-text-block">
																<div class="select-closed__item-title">
																	{item.label}
																</div>
																<Show when={item.subtitle}>
																	<div class="select-closed__item-subtitle">
																		{item.subtitle}
																	</div>
																</Show>
															</div>
														</div>
													}
												>
													{(RenderItem) => (
														<div>
															<RenderItem item={item} />
														</div>
													)}
												</Show>
												<ItemIndicator class="select-closed__item-indicator">
													<svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M13.5 4.5L6 12L2.5 8.5"
															stroke="currentColor"
															stroke-width="1.5"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
												</ItemIndicator>
											</Item>
										)}
									</For>
								</Content>
							</Positioner>
						</Portal>

						<Select.HiddenSelect />
					</>
				);
			}}
		</Select.Context>
	);
};

export {
	SelectContext as Context,
	SelectHiddenSelect as HiddenSelect
} from "@ark-ui/solid";
