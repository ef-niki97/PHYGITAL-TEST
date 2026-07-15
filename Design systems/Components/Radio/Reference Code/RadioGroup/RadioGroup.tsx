import type { Assign, HTMLProps } from "@ark-ui/solid";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid";
import type { Component, ParentComponent } from "solid-js";
import { type ComponentProps, For, splitProps } from "solid-js";
import { twJoin } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const styles = tv({
	base: "",
	defaultVariants: { size: "md" },
	slots: {
		root: "flex flex-col gap-3",
		label: "caption-12-medium text-text-secondary",
		indicator: "",
		item: "flex items-center gap-2",
		itemText: "typography-text-14-medium text-text-secondary-v2",
		itemControl: twJoin(
			"relative cursor-pointer rounded-full border-2 border-border-tertiary",
			"hover:border-border-gray-dark",
			"before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:top-1/2 before:left-1/2 before:content-['']",
			"before:h-3 before:w-3 before:rounded-full before:bg-interaction-violet before:opacity-0",
			"data-[state=checked]:before:opacity-100",
			"data-[state=checked]:hover:before:bg-interaction-violet-hv"
		),
		itemLabel: "cursor-pointer"
	},
	variants: {
		color: {},
		size: {
			md: {
				root: "",
				label: "",
				indicator: "",
				item: "",
				itemText: "",
				itemControl: "size-5",
				itemLabel: ""
			}
		},
		disabled: {
			true: {
				root: "pointer-events-none opacity-40",
				label: "",
				indicator: "",
				item: "",
				itemText: "",
				itemControl: "pointer-events-none opacity-40",
				itemLabel: ""
			}
		}
	}
});

const { withProvider, withContext, withRootProvider } = createStyleContext(styles);

export type ArkRadioGroupVariantProps = VariantProps<typeof styles>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;

export const RootProvider = withRootProvider<
	Assign<Assign<HTMLProps<"div">, ArkRadioGroup.RootProviderProps>, ArkRadioGroupVariantProps>
>(ArkRadioGroup.RootProvider);

export type RootProps = ComponentProps<typeof Root>;

export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, ArkRadioGroup.RootProps>, ArkRadioGroupVariantProps>
>(ArkRadioGroup.Root, "root");

export const Label = withContext<Assign<HTMLProps<"label">, ArkRadioGroup.LabelBaseProps>>(
	ArkRadioGroup.Label,
	"label"
);

export const Indicator = withContext<Assign<HTMLProps<"div">, ArkRadioGroup.IndicatorBaseProps>>(
	ArkRadioGroup.Indicator,
	"indicator"
);

export const Item = withContext<Assign<HTMLProps<"label">, ArkRadioGroup.ItemBaseProps>>(
	ArkRadioGroup.Item,
	"item"
);

export const ItemText = withContext<Assign<HTMLProps<"span">, ArkRadioGroup.ItemTextBaseProps>>(
	ArkRadioGroup.ItemText,
	"itemText"
);

export const ItemControl = withContext<
	Assign<HTMLProps<"div">, ArkRadioGroup.ItemControlBaseProps>
>(ArkRadioGroup.ItemControl, "itemControl");

export const ItemLabel = withContext<Assign<HTMLProps<"label">, ArkRadioGroup.ItemTextBaseProps>>(
	ArkRadioGroup.ItemText,
	"itemLabel"
);

export const HiddenInput = ArkRadioGroup.ItemHiddenInput;

// Закрытый компонент для отдельного radio элемента
export type RadioItemProps = {
	value: string;
	disabled?: boolean;
} & ComponentProps<typeof Item>;

export const ArkClosedRadioItem: ParentComponent<RadioItemProps> = (props) => {
	const [local, others] = splitProps(props, ["children", "value", "disabled"]);

	return (
		<Item value={local.value} disabled={local.disabled} {...others}>
			<ItemControl />
			<ItemText>{local.children}</ItemText>
			<HiddenInput />
		</Item>
	);
};

// Полный RadioGroup с несколькими элементами
export type RadioGroupProps = {
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	label?: string;
	value?: string;
	defaultValue?: string;
	onValueChange?: (details: { value: string }) => void;
	disabled?: boolean;
} & Omit<RootProps, "children">;

export const ArkClosedRadioGroup: Component<RadioGroupProps> = (props) => {
	const [local, others] = splitProps(props, [
		"options",
		"label",
		"value",
		"defaultValue",
		"onValueChange",
		"disabled"
	]);

	return (
		<Root
			value={local.value}
			defaultValue={local.defaultValue}
			onValueChange={local.onValueChange}
			disabled={local.disabled}
			{...others}
		>
			{local.label && <Label>{local.label}</Label>}
			<Indicator />
			<For each={local.options}>
				{(option) => (
					<ArkClosedRadioItem
						value={option.value}
						disabled={option.disabled || local.disabled}
					>
						{option.label}
					</ArkClosedRadioItem>
				)}
			</For>
		</Root>
	);
};
