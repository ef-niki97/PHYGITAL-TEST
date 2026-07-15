import { createListCollection, useSelect } from "@ark-ui/solid";
import { Heart, Image, Mail, Settings, Star, User } from "lucide-solid";
import { createSignal, For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import { Button } from "~/solidJs/shared/ui";
import { StyledSelect, StyledSelectClosed } from ".";
import type { SelectClosedItem as ClosedItem } from "./SelectClosed";

const FRUITS: { label: string; value: string }[] = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
	{ label: "Date", value: "date" },
	{ label: "Elderberry", value: "elderberry" }
];

const ICON_ITEMS: { label: string; value: string; icon: typeof Heart }[] = [
	{ label: "Profile", value: "profile", icon: User },
	{ label: "Mail", value: "mail", icon: Mail },
	{ label: "Settings", value: "settings", icon: Settings },
	{ label: "Favorites", value: "favorites", icon: Heart }
];

const PEOPLE: ClosedItem<string>[] = [
	{
		id: "anna",
		label: "Anna Smith",
		value: "anna",
		subtitle: "anna@example.com",
		icon: User
	},
	{
		id: "ben",
		label: "Ben Carter",
		value: "ben",
		subtitle: "ben@example.com",
		icon: User
	},
	{
		id: "chris",
		label: "Chris Doe",
		value: "chris",
		subtitle: "chris@example.com",
		icon: User
	},
	{
		id: "dana",
		label: "Dana Smith",
		value: "dana",
		subtitle: "dana@example.com",
		icon: User,
		disabled: true
	}
];

const selectStylesDoc = [
	{
		name: "StyledSelect — Variant: default (общий стиль)",
		description: "Используется для большинства мест, где нужен селект с текстом",
		entries: [
			{ property: "font-size", value: "14px" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "цвет текста", value: "#2D2D2D (--text-primary)" },
			{ property: "border", value: "none" },
			{ property: "outline", value: "none (с offset −1px при открытии)" },
			{ property: "padding (по горизонтали)", value: "8px" },
			{ property: "padding (по вертикали)", value: "4px" },
			{ property: "border-radius", value: "8px" },
			{ property: "gap между текстом и стрелкой", value: "6px" },
			{
				property: "background при hover",
				value: "#EAEAEC (--interaction-grey-light-hv)"
			},
			{
				property: "background при открытии",
				value: "#EAEAEC (--interaction-grey-light-hv)"
			},
			{
				property: "outline при открытии",
				value: "1px solid #EFEFF0 (--border-secondary)"
			},
			{
				property: "стрелка при открытии",
				value: "поворот на 180°"
			}
		]
	},
	{
		name: "StyledSelect — Размер: sm",
		entries: [
			{ property: "font-size", value: "11px" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "padding (по горизонтали)", value: "8px" },
			{ property: "padding (по вертикали)", value: "4px" },
			{ property: "border-radius", value: "8px" },
			{ property: "gap между элементами", value: "6px" }
		]
	},
	{
		name: "StyledSelect — Размер: md (по умолчанию)",
		entries: [
			{ property: "font-size", value: "14px" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "padding (по горизонтали)", value: "8px" },
			{ property: "padding (по вертикали)", value: "4px" },
			{ property: "border-radius", value: "8px" }
		]
	},
	{
		name: "StyledSelect — Размер: lg",
		entries: [
			{ property: "font-size", value: "14px" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "padding (по горизонтали)", value: "12px" },
			{ property: "padding (по вертикали)", value: "10px" },
			{ property: "border-radius", value: "12px" },
			{ property: "gap между элементами", value: "8px" },
			{
				property: "background",
				value: "#F3F3F4 (--interaction-grey-light)"
			},
			{
				property: "background при hover",
				value: "#EAEAEC (--interaction-grey-light-hv)"
			},
			{
				property: "outline при открытии",
				value: "1px solid #DDE1E6 (--border-tertiary)"
			}
		]
	},
	{
		name: "StyledSelect — Содержимое (выпадающий список)",
		description: "Контейнер с пунктами меню (через Portal)",
		entries: [
			{ property: "background", value: "#FFFFFF" },
			{ property: "border", value: "1px solid #EFEFF0 (--border-secondary)" },
			{ property: "border-radius", value: "16px" },
			{ property: "padding", value: "12px" },
			{ property: "тень", value: "0 10px 15px −3px чёрной 10%" },
			{ property: "z-index", value: "1000" },
			{ property: "максимальная высота", value: "384px (24rem)" },
			{ property: "overflow", value: "auto" },
			{ property: "анимация появления", value: "fadeIn (плавное появление)" },
			{ property: "gap между пунктами (sm/md)", value: "8px" }
		]
	},
	{
		name: "StyledSelect — Пункт меню (item)",
		entries: [
			{ property: "display", value: "flex" },
			{ property: "выравнивание", value: "по центру вертикально" },
			{ property: "justify-content", value: "space-between" },
			{ property: "gap (default variant)", value: "2px" },
			{ property: "padding", value: "8px" },
			{ property: "border-radius", value: "8px" },
			{ property: "background", value: "прозрачный" },
			{ property: "cursor", value: "pointer" },
			{
				property: "background при hover",
				value: "#F7F7F7 (--interaction-white-hv)"
			},
			{
				property: "background (выделение клавиатурой)",
				value: "#F7F7F7 (--interaction-white-hv)"
			},
			{
				property: "цвет текста",
				value: "#555555 (--text-secondary-v2)"
			}
		]
	},
	{
		name: "StyledSelect — Иконка слева от текста (если задана item.icon)",
		entries: [
			{ property: "обёртка", value: "квадрат 32×32 с фоном" },
			{
				property: "background обёртки",
				value: "#F7F7F7 (--background-gray-light)"
			},
			{ property: "border-radius обёртки", value: "8px" },
			{ property: "размер иконки", value: "16×16 (size-4)" }
		]
	},
	{
		name: "StyledSelect — Индикатор выбора (галочка)",
		description: "Появляется на выбранном пункте",
		entries: [
			{
				property: "иконка",
				value: "Check 24×24 (lucide-solid)"
			},
			{
				property: "цвет",
				value: "#999999 (--text-secondary)"
			}
		]
	},
	{
		name: "StyledSelectClosed — Триггер (без RootProvider)",
		description:
			"Альтернативная реализация. Используется в связке с внешним RootProvider + useSelect()",
		entries: [
			{ property: "display", value: "flex" },
			{ property: "выравнивание", value: "items-center / justify-between" },
			{ property: "gap между текстом и иконкой", value: "8px" },
			{ property: "background", value: "#FFFFFF" },
			{ property: "border", value: "1px solid #D1D5DB (gray-300)" },
			{ property: "border-radius", value: "6px" },
			{ property: "padding (по горизонтали)", value: "12px" },
			{ property: "padding (по вертикали)", value: "8px" },
			{ property: "font-size", value: "14px" },
			{
				property: "background при hover",
				value: "#F9FAFB (gray-50)"
			},
			{
				property: "border при focus",
				value: "прозрачный + ring 2px #3B82F6 (blue-500)"
			},
			{
				property: "при disabled",
				value: "курсор not-allowed, прозрачность 50%"
			}
		]
	},
	{
		name: "StyledSelectClosed — Variant: outline / ghost",
		description: "Различия между outline (с рамкой) и ghost (без рамки)",
		entries: [
			{ property: "outline — border", value: "1px solid #D1D5DB (gray-300)" },
			{ property: "outline — focus border", value: "#3B82F6 (blue-500)" },
			{ property: "ghost — border", value: "прозрачный" },
			{ property: "ghost — background", value: "прозрачный" },
			{
				property: "ghost — background при hover",
				value: "#F9FAFB (gray-50)"
			}
		]
	},
	{
		name: "StyledSelectClosed — Размеры",
		description: "Доступны 4 размера: xs / sm / md / lg",
		entries: [
			{ property: "xs — padding", value: "8px / 4px" },
			{ property: "xs — font-size", value: "12px (text-xs)" },
			{ property: "sm — padding", value: "10px / 6px" },
			{ property: "sm — font-size", value: "14px (text-sm)" },
			{ property: "md — padding", value: "12px / 8px" },
			{ property: "md — font-size", value: "14px (text-sm)" },
			{ property: "lg — padding", value: "16px / 10px" },
			{ property: "lg — font-size", value: "16px (text-base)" }
		]
	},
	{
		name: "StyledSelectClosed — Контент списка",
		entries: [
			{ property: "background", value: "#FFFFFF" },
			{ property: "border", value: "1px solid #E5E7EB (gray-200)" },
			{ property: "border-radius", value: "16px" },
			{ property: "padding", value: "12px" },
			{ property: "минимальная ширина", value: "200px" },
			{ property: "максимальная высота", value: "384px (24rem) или maxHeight prop" },
			{
				property: "тень",
				value: "0 10px 15px −3px чёрной 10%"
			},
			{
				property: "анимация появления",
				value: "fadeIn"
			},
			{ property: "z-index", value: "1000" }
		]
	},
	{
		name: "StyledSelectClosed — Пункт списка",
		entries: [
			{ property: "display", value: "flex" },
			{ property: "выравнивание", value: "items-center" },
			{ property: "gap", value: "8px" },
			{ property: "padding (по горизонтали)", value: "8px" },
			{ property: "padding (по вертикали)", value: "8px" },
			{ property: "border-radius", value: "8px" },
			{ property: "font-size", value: "14px" },
			{ property: "cursor", value: "pointer" },
			{
				property: "background при hover",
				value: "#F9FAFB (gray-50)"
			},
			{
				property: "background при выделении (highlighted)",
				value: "#F9FAFB (gray-50)"
			},
			{
				property: "background при выборе (selected)",
				value: "#EFF6FF (blue-50)"
			},
			{
				property: "при disabled",
				value: "курсор not-allowed, прозрачность 50%"
			}
		]
	},
	{
		name: "StyledSelectClosed — Подзаголовок пункта (subtitle)",
		entries: [
			{ property: "цвет", value: "#6B7280 (gray-500)" },
			{ property: "font-size", value: "12px (text-xs)" }
		]
	},
	{
		name: "StyledSelectClosed — Аватар / иконка пункта",
		description: "Контейнер для item.icon или item.avatar",
		entries: [
			{ property: "ширина / высота", value: "32×32" },
			{ property: "background", value: "#F3F4F6 (gray-100)" },
			{ property: "border-radius", value: "8px" },
			{ property: "размер иконки", value: "16×16" }
		]
	},
	{
		name: "StyledSelectClosed — Значение (текст триггера)",
		entries: [
			{ property: "цвет (выбрано)", value: "#111827 (gray-900)" },
			{ property: "цвет (плейсхолдер)", value: "#6B7280 (gray-500)" },
			{ property: "обрезание", value: "truncate (одной строкой с ...)" }
		]
	}
];

const meta: Meta = {
	title: "Molecules/Select",
	parameters: {
		layout: "padded",
		componentStyles: selectStylesDoc
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj;

const SelectVariantDemo = (props: {
	variant?: "default" | "ghost";
	size?: "sm" | "md" | "lg";
	withLabel?: boolean;
	withIcons?: boolean;
}) => {
	const items = props.withIcons ? ICON_ITEMS : FRUITS;
	const [value, setValue] = createSignal<(typeof items)[number] | undefined>();

	return (
		<div class="w-56">
			<StyledSelect.SelectClosedComponent
				items={items}
				rootProps={{
					size: props.size ?? "md",
					variant: props.variant ?? "default",
					positioning: { sameWidth: true },
					onValueChange: (d) => setValue(d.items[0])
				}}
				placeholder={
					<span class="text-text-secondary">
						{props.withIcons ? "Pick a tab" : "Pick a fruit"}
					</span>
				}
				value={value() ? [value()!] : []}
				label={props.withLabel ? "Choose option" : undefined}
				triggerProps={{
					class: "w-full",
					asChild: (p) => (
						<Button {...p()} class="w-full justify-between" variant="TertiaryOverlay" />
					)
				}}
			/>
		</div>
	);
};

const SelectClosedDemo = (props: {
	size?: "xs" | "sm" | "md" | "lg";
	variant?: "outline" | "ghost";
	disabled?: boolean;
	preselected?: boolean;
}) => {
	const collection = createListCollection({ items: PEOPLE });
	const [value, setValue] = createSignal<string[]>(props.preselected ? ["ben"] : []);

	const api = useSelect<ClosedItem<string>>(() => ({
		collection,
		value: value(),
		onValueChange: (d) => setValue(d.value),
		positioning: { sameWidth: true },
		multiple: false,
		disabled: props.disabled
	}));

	return (
		<div class="w-56">
			<StyledSelectClosed.RootProvider value={api} size={props.size} variant={props.variant}>
				<StyledSelectClosed.SelectClosedComponentWithoutRoot<string>
					items={PEOPLE}
					placeholder="Select a teammate"
					triggerProps={{
						asChild(p) {
							return (
								<Button
									{...p()}
									class="w-full items-center justify-between gap-2"
									variant="TertiaryOverlay"
									size="medium"
								/>
							);
						}
					}}
				/>
			</StyledSelectClosed.RootProvider>
		</div>
	);
};

const SELECT_VARIANTS = ["default", "ghost"] as const;
const SELECT_SIZES = ["sm", "md", "lg"] as const;
const CLOSED_SIZES = ["xs", "sm", "md", "lg"] as const;
const CLOSED_VARIANTS = ["outline", "ghost"] as const;

export const AllSelectsShowcase: Story = {
	name: "All selects — unified table",
	render: () => (
		<div class="w-full overflow-x-auto bg-background-content-tertiary p-4">
			<table class="w-full min-w-[1240px] border-collapse text-left">
				<thead>
					<tr class="border-border-secondary border-b">
						<th class="caption-12-medium w-56 p-3 text-text-secondary">
							Component / Variant
						</th>
						<th class="caption-12-medium p-3 text-text-secondary">Default</th>
						<th class="caption-12-medium p-3 text-text-secondary">With label</th>
						<th class="caption-12-medium p-3 text-text-secondary">With icons</th>
						<th class="caption-12-medium p-3 text-text-secondary">Disabled</th>
						<th class="caption-12-medium p-3 text-text-secondary">Pre-selected</th>
					</tr>
				</thead>
				<tbody>
					<For each={SELECT_VARIANTS}>
						{(variant) => (
							<For each={SELECT_SIZES}>
								{(size) => (
									<tr class="border-border-secondary border-b align-top">
										<td class="p-3 font-mono text-2xs text-text-primary">
											StyledSelect / {variant} / {size}
										</td>
										<td class="p-3">
											<SelectVariantDemo variant={variant} size={size} />
										</td>
										<td class="p-3">
											<SelectVariantDemo
												variant={variant}
												size={size}
												withLabel
											/>
										</td>
										<td class="p-3">
											<SelectVariantDemo
												variant={variant}
												size={size}
												withIcons
											/>
										</td>
										<td class="p-3 text-2xs text-text-tertiary">
											—{" "}
											<span class="text-[10px]">
												(управляется rootProps.disabled)
											</span>
										</td>
										<td class="p-3 text-2xs text-text-tertiary">
											— <span class="text-[10px]">(см. ниже)</span>
										</td>
									</tr>
								)}
							</For>
						)}
					</For>

					<For each={CLOSED_VARIANTS}>
						{(variant) => (
							<For each={CLOSED_SIZES}>
								{(size) => (
									<tr class="border-border-secondary border-b align-top">
										<td class="p-3 font-mono text-2xs text-text-primary">
											StyledSelectClosed / {variant} / {size}
										</td>
										<td class="p-3">
											<SelectClosedDemo variant={variant} size={size} />
										</td>
										<td class="p-3 text-2xs text-text-tertiary">
											—{" "}
											<span class="text-[10px]">(label snap-в Trigger)</span>
										</td>
										<td class="p-3">
											<SelectClosedDemo variant={variant} size={size} />
										</td>
										<td class="p-3">
											<SelectClosedDemo
												variant={variant}
												size={size}
												disabled
											/>
										</td>
										<td class="p-3">
											<SelectClosedDemo
												variant={variant}
												size={size}
												preselected
											/>
										</td>
									</tr>
								)}
							</For>
						)}
					</For>
				</tbody>
			</table>
		</div>
	)
};

export const SelectDefault: Story = {
	name: "StyledSelect — Default",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectVariantDemo variant="default" size="md" />
		</div>
	)
};

export const SelectWithIcons: Story = {
	name: "StyledSelect — With icons",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectVariantDemo variant="default" size="md" withIcons />
		</div>
	)
};

export const SelectWithLabel: Story = {
	name: "StyledSelect — With label",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectVariantDemo variant="default" size="lg" withLabel />
		</div>
	)
};

export const SelectClosedDefault: Story = {
	name: "StyledSelectClosed — Default",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectClosedDemo variant="outline" size="md" />
		</div>
	)
};

export const SelectClosedDisabled: Story = {
	name: "StyledSelectClosed — Disabled",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectClosedDemo variant="outline" size="md" disabled />
		</div>
	)
};

export const SelectClosedPreselected: Story = {
	name: "StyledSelectClosed — Preselected value",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SelectClosedDemo variant="outline" size="md" preselected />
		</div>
	)
};

interface PlaygroundArgs {
	component: "StyledSelect" | "StyledSelectClosed";
	selectVariant: "default" | "ghost";
	selectSize: "sm" | "md" | "lg";
	closedVariant: "outline" | "ghost";
	closedSize: "xs" | "sm" | "md" | "lg";
	withLabel: boolean;
	withIcons: boolean;
	disabled: boolean;
	preselected: boolean;
	itemsPreset: "fruits" | "icons" | "people";
	itemsCount: number;
	placeholder: string;
}

const PlaygroundSelect = (props: PlaygroundArgs) => {
	const baseItems = (() => {
		if (props.itemsPreset === "icons") return ICON_ITEMS;
		if (props.itemsPreset === "people")
			return PEOPLE.map((p) => ({
				label: p.label,
				value: p.value,
				icon: Star,
				subtitle: p.subtitle
			}));
		return FRUITS.map((f) => ({ ...f, icon: props.withIcons ? Image : undefined }));
	})();

	const items = baseItems.slice(0, props.itemsCount);
	const [value, setValue] = createSignal<(typeof items)[number] | undefined>(
		props.preselected ? items[0] : undefined
	);

	return (
		<div class="w-72">
			<StyledSelect.SelectClosedComponent
				items={items}
				rootProps={{
					size: props.selectSize,
					variant: props.selectVariant,
					positioning: { sameWidth: true },
					disabled: props.disabled,
					onValueChange: (d) => setValue(d.items[0])
				}}
				placeholder={<span class="text-text-secondary">{props.placeholder}</span>}
				value={value() ? [value()!] : []}
				label={props.withLabel ? "Choose option" : undefined}
				triggerProps={{
					class: "w-full",
					asChild: (p) => (
						<Button {...p()} class="w-full justify-between" variant="TertiaryOverlay" />
					)
				}}
			/>
		</div>
	);
};

const PlaygroundClosed = (props: PlaygroundArgs) => {
	const items = (() => {
		const base =
			props.itemsPreset === "fruits"
				? FRUITS.map(
						(f, i): ClosedItem<string> => ({
							id: f.value,
							label: f.label,
							value: f.value,
							icon: i % 2 === 0 ? Heart : Star
						})
					)
				: PEOPLE;
		return base.slice(0, props.itemsCount);
	})();

	const collection = createListCollection({ items });
	const [value, setValue] = createSignal<string[]>(
		props.preselected && items.length > 0 ? [items[0].value] : []
	);

	const api = useSelect<ClosedItem<string>>(() => ({
		collection,
		value: value(),
		onValueChange: (d) => setValue(d.value),
		positioning: { sameWidth: true },
		multiple: false,
		disabled: props.disabled
	}));

	return (
		<div class="w-72">
			<StyledSelectClosed.RootProvider
				value={api}
				size={props.closedSize}
				variant={props.closedVariant}
			>
				<StyledSelectClosed.SelectClosedComponentWithoutRoot<string>
					items={items}
					placeholder={props.placeholder}
					label={props.withLabel ? "Choose option" : undefined}
					triggerProps={{
						asChild(p) {
							return (
								<Button
									{...p()}
									class="w-full items-center justify-between gap-2"
									variant="TertiaryOverlay"
									size="medium"
								/>
							);
						}
					}}
				/>
			</StyledSelectClosed.RootProvider>
		</div>
	);
};

const PlaygroundView = (props: PlaygroundArgs) => (
	<div class="flex min-h-[420px] flex-col gap-4 bg-background-content-tertiary p-6">
		<div class="rounded-xl border border-border-secondary bg-white p-4">
			<div class="caption-13-medium mb-3 text-text-primary">Live preview</div>
			{props.component === "StyledSelect" ? (
				<PlaygroundSelect {...props} />
			) : (
				<PlaygroundClosed {...props} />
			)}
		</div>
	</div>
);

export const Playground: StoryObj<PlaygroundArgs> = {
	name: "Playground",
	argTypes: {
		component: {
			control: "inline-radio",
			options: ["StyledSelect", "StyledSelectClosed"],
			table: { category: "Component" }
		},
		placeholder: { control: "text", table: { category: "Content" } },
		itemsPreset: {
			control: "inline-radio",
			options: ["fruits", "icons", "people"],
			table: { category: "Content" }
		},
		itemsCount: {
			control: { type: "range", min: 1, max: 5, step: 1 },
			table: { category: "Content" }
		},
		withLabel: { control: "boolean", table: { category: "Content" } },
		withIcons: {
			control: "boolean",
			description: "Только для StyledSelect + 'fruits'",
			table: { category: "Content" }
		},
		disabled: { control: "boolean", table: { category: "State" } },
		preselected: { control: "boolean", table: { category: "State" } },
		selectVariant: {
			control: "inline-radio",
			options: ["default", "ghost"],
			table: { category: "StyledSelect" }
		},
		selectSize: {
			control: "inline-radio",
			options: ["sm", "md", "lg"],
			table: { category: "StyledSelect" }
		},
		closedVariant: {
			control: "inline-radio",
			options: ["outline", "ghost"],
			table: { category: "StyledSelectClosed" }
		},
		closedSize: {
			control: "inline-radio",
			options: ["xs", "sm", "md", "lg"],
			table: { category: "StyledSelectClosed" }
		}
	},
	args: {
		component: "StyledSelect",
		placeholder: "Select an option",
		itemsPreset: "fruits",
		itemsCount: 4,
		withLabel: false,
		withIcons: false,
		disabled: false,
		preselected: false,
		selectVariant: "default",
		selectSize: "md",
		closedVariant: "outline",
		closedSize: "md"
	},
	render: (args: PlaygroundArgs) => <PlaygroundView {...args} />
};
