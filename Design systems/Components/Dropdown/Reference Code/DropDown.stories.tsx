import { createSignal, For, type JSX, Show } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import type { moleculesElementsSizes } from "~/solidJs/shared/helpers/types/MoleculesElementsSizes";
import { Button, MultiselectTagFilter } from "~/solidJs/shared/ui";
import { DropDown } from "./DropDown";
import { DropDownPicker } from "./DropDownPicker";

interface Fruit {
	id: string;
	name: string;
}

const FRUITS: Fruit[] = [
	{ id: "apple", name: "Apple" },
	{ id: "banana", name: "Banana" },
	{ id: "cherry", name: "Cherry" },
	{ id: "date", name: "Date" },
	{ id: "elderberry", name: "Elderberry" },
	{ id: "fig", name: "Fig" }
];

const COUNTRIES = ["United States", "United Kingdom", "Germany", "France", "Japan"] as const;

const PICKER_SIZES = [
	"small",
	"medium",
	"large"
] as const satisfies readonly moleculesElementsSizes[];

const dropDownStylesDoc = [
	{
		name: "DropDown — Trigger (кнопка-открыватель)",
		description:
			"Базовый триггер на основе HoverCard. Контент выпадает по hover/focus с задержкой",
		entries: [
			{ property: "display", value: "inline-flex (горизонтально)" },
			{ property: "align-items", value: "по центру" },
			{ property: "justify-content", value: "по центру" },
			{ property: "gap между текстом и стрелкой", value: "8px" },
			{ property: "border-radius", value: "6px" },
			{ property: "border", value: "1px прозрачная (для focus-ring)" },
			{ property: "padding", value: "8px 12px" },
			{ property: "font-size", value: "12px" },
			{ property: "font-weight", value: "400 (regular)" },
			{ property: "цвет текста", value: "#FFFFFF (белый)" },
			{
				property: "цвет текста (dark mode)",
				value: "#999999 (--text-secondary)"
			},
			{ property: "background при focus", value: "ring 2px серый" },
			{ property: "transition", value: "по всем свойствам (плавно)" }
		]
	},
	{
		name: "DropDown — Стрелка-индикатор",
		description: "Стрелка-шеврон, поворачивается на 180° когда меню открыто",
		entries: [
			{ property: "размер (ширина × высота)", value: "10px × 10px" },
			{ property: "цвет", value: "#FFFFFF (белый)" },
			{ property: "поворот при открытии", value: "180°" }
		]
	},
	{
		name: "DropDown — Контейнер контента (выпадающее меню)",
		description: "Контейнер выпадающего списка, появляется через Portal",
		entries: [
			{ property: "минимальная ширина", value: "192px" },
			{ property: "background", value: "#1F2937 (тёмно-серый, gray-800)" },
			{ property: "border-radius", value: "8px" },
			{ property: "padding (по бокам)", value: "4px" },
			{ property: "padding (сверху и снизу)", value: "8px" },
			{ property: "тень", value: "средняя (0 4px 6px чёрной с прозрачностью)" },
			{
				property: "z-index",
				value: "10",
				description: "Поверх обычного контента, но под модалями"
			},
			{ property: "layout", value: "flex column (элементы в столбик)" },
			{ property: "gap между элементами", value: "8px" },
			{
				property: "позиционирование",
				value: "снизу-справа от триггера",
				description: "С отступом 5px от триггера"
			},
			{
				property: "задержка открытия",
				value: "0мс (мгновенно)"
			},
			{
				property: "задержка закрытия",
				value: "100мс",
				description: "Чтобы успеть навести курсор на меню"
			}
		]
	},
	{
		name: "DropDownPicker — Триггер (Button-обёртка)",
		description:
			"Базируется на компоненте Button (variant=dark по умолчанию). Открывает список выбора",
		entries: [
			{ property: "layout", value: "flex row (горизонтально)" },
			{ property: "выравнивание", value: "по левому краю" },
			{ property: "ширина", value: "100% от родителя" },
			{ property: "padding (сверху и снизу)", value: "4px" },
			{ property: "gap между лейблом и стрелкой", value: "8px" },
			{ property: "font-size", value: "10px (2xs preset)" },
			{
				property: "background (variant=dark, по умолчанию)",
				value: "#2D2D2D (--background-black)"
			},
			{ property: "цвет текста", value: "#FFFFFF" },
			{
				property: "стрелка (закрыто)",
				value: "повёрнута влево (-90°)",
				description: "ArrowIcon"
			},
			{ property: "стрелка (открыто)", value: "повёрнута вправо (90°)" },
			{ property: "высота стрелки", value: "12px" }
		]
	},
	{
		name: "DropDownPicker — Размер: small",
		description: "Унаследовано от Button size='small'",
		entries: [
			{ property: "padding (по горизонтали)", value: "12px" },
			{ property: "padding (по вертикали)", value: "8px" },
			{ property: "font-size", value: "12px" },
			{ property: "line-height", value: "16px" },
			{ property: "font-weight", value: "500 (medium)" }
		]
	},
	{
		name: "DropDownPicker — Размер: medium",
		entries: [
			{ property: "padding (по горизонтали)", value: "12px" },
			{ property: "padding (по вертикали)", value: "10px" },
			{ property: "font-size", value: "14px" }
		]
	},
	{
		name: "DropDownPicker — Размер: large",
		entries: [
			{ property: "padding (по горизонтали)", value: "28px" },
			{ property: "padding (по вертикали)", value: "12px" },
			{ property: "border-radius", value: "6px" },
			{ property: "font-size", value: "14px" },
			{ property: "line-height", value: "16px" },
			{ property: "font-weight", value: "500 (medium)" }
		]
	},
	{
		name: "DropDownPicker — Список выбора (выпадающие пункты)",
		description: "Контейнер списка пунктов, появляется под триггером",
		entries: [
			{ property: "background", value: "#202020 (тёмно-серый)" },
			{ property: "border-radius", value: "4px" },
			{ property: "позиция", value: "absolute (под кнопкой)" },
			{ property: "ширина", value: "100% от ширины триггера" },
			{ property: "минимальная ширина", value: "по контенту" },
			{ property: "максимальная высота", value: "200px" },
			{ property: "overflow по Y", value: "scroll" },
			{ property: "padding (по горизонтали)", value: "5px" },
			{ property: "padding (по вертикали)", value: "10px" },
			{ property: "z-index", value: "10" },
			{
				property: "тень",
				value: "0 6px 30px чёрной с прозрачностью 70%",
				description: "Сильная тень для отрыва от фона"
			},
			{
				property: "смещение от триггера",
				value: "10px вниз",
				description: "translateY(100%) + bottom: -10px"
			}
		]
	},
	{
		name: "DropDownPicker — Пункт списка",
		description: "Один пункт в списке выбора",
		entries: [
			{ property: "ширина", value: "100% (растягивается)" },
			{ property: "padding (по горизонтали)", value: "10px" },
			{ property: "padding (по вертикали)", value: "5px" },
			{ property: "border-radius", value: "5px" },
			{ property: "цвет текста", value: "#EEEEEE (светло-серый)" },
			{
				property: "list-style",
				value: "none",
				description: "Без маркеров списка"
			}
		]
	},
	{
		name: "DropDownPicker — Пункт списка (выбран)",
		description: "Активный/выбранный пункт",
		entries: [
			{ property: "background", value: "#A3A3A3 (серый)" },
			{ property: "цвет текста", value: "#EEEEEE (без изменений)" }
		]
	},
	{
		name: "MultiselectTagFilter — Контейнер пункта",
		description:
			"Используется как content внутри пункта DropDownPicker в режиме мульти-выбора. Toggle + текст",
		entries: [
			{ property: "display", value: "flex" },
			{ property: "gap между Toggle и текстом", value: "10px" }
		]
	}
];

const withPickerPanelRoom = (Story: () => JSX.Element) => (
	<div class="min-h-[min(70vh,520px)] w-full overflow-visible py-2">
		<Story />
	</div>
);

const meta: Meta = {
	title: "Molecules/DropDown",
	decorators: [withPickerPanelRoom],
	parameters: {
		layout: "padded",
		componentStyles: dropDownStylesDoc
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj;

const PICKER_VARIANTS = ["dark", "TertiaryOverlay", "PrimaryAccent"] as const;

const FruitItemContent = (props: { fruit: Fruit }) => (
	<span class="caption-12-regular">{props.fruit.name}</span>
);

const FruitLabel = (props: { fruit: Fruit }) => (
	<span class="caption-12-medium text-white">{props.fruit.name}</span>
);

const SimpleDropDownDemo = () => (
	<DropDown
		btnContent="Open menu"
		btnClass="bg-interaction-violet hover:bg-interaction-violet-hv"
	>
		<button
			type="button"
			class="caption-12-regular w-full rounded-md px-2 py-1.5 text-left text-white hover:bg-white/10"
		>
			View profile
		</button>
		<button
			type="button"
			class="caption-12-regular w-full rounded-md px-2 py-1.5 text-left text-white hover:bg-white/10"
		>
			Settings
		</button>
		<button
			type="button"
			class="caption-12-regular w-full rounded-md px-2 py-1.5 text-left text-white hover:bg-white/10"
		>
			Sign out
		</button>
	</DropDown>
);

const NoArrowDropDownDemo = () => (
	<DropDown
		btnContent="Hover me (no arrow)"
		isNeedToHiderArrow
		btnClass="bg-background-black hover:bg-interaction-black-hv"
	>
		<div class="caption-12-regular px-2 py-1.5 text-white">Tooltip-style content</div>
	</DropDown>
);

const RichDropDownDemo = () => (
	<DropDown
		btnContent={
			<span class="flex items-center gap-1.5">
				<span class="size-2 rounded-full bg-status-accent-positive" />
				Status: Online
			</span>
		}
		btnClass="bg-background-black hover:bg-interaction-black-hv"
		containerClass="min-w-[240px] gap-3 p-3"
	>
		<div class="flex flex-col gap-1">
			<span class="caption-12-semibold text-white">Workspace</span>
			<span class="caption-11-regular text-text-tertiary">my-team / project-123</span>
		</div>
		<div class="h-px w-full bg-white/10" />
		<button
			type="button"
			class="caption-12-regular w-full rounded-md px-2 py-1.5 text-left text-white hover:bg-white/10"
		>
			Switch workspace
		</button>
	</DropDown>
);

const SingleSelectPicker = (props: {
	values: readonly string[];
	size?: moleculesElementsSizes;
	variant?: "dark" | "TertiaryOverlay" | "PrimaryAccent";
}) => {
	const [active, setActive] = createSignal(0);
	return (
		<div class="w-56">
			<DropDownPicker
				mode="singleSelect"
				values={[...props.values]}
				getActiveIndex={active()}
				setActiveIndex={(idx) => setActive(idx)}
				size={props.size}
				variant={props.variant}
				labelComponent={(item) => (
					<span class="caption-12-medium truncate text-white">{item}</span>
				)}
			>
				{(item) => <span class="caption-12-regular">{item()}</span>}
			</DropDownPicker>
		</div>
	);
};

const MultiSelectPicker = (props: { items: Fruit[] }) => {
	const [selected, setSelected] = createSignal<Record<string, boolean>>({});

	const labelText = () => {
		const count = Object.keys(selected()).length;
		if (count === 0) return "Select fruits";
		if (count === 1) {
			const id = Object.keys(selected())[0];
			return props.items.find((i) => i.id === id)?.name ?? "1 selected";
		}
		return `${count} fruits selected`;
	};

	return (
		<div class="w-56">
			<DropDownPicker
				mode="multiSelect"
				uniqueValueProp="id"
				values={props.items}
				getActiveIndex={selected()}
				setActiveIndex={(item) =>
					setSelected((prev) => {
						if (item.id in prev) {
							const next = { ...prev };
							delete next[item.id];
							return next;
						}
						return { ...prev, [item.id]: true };
					})
				}
				labelComponent={() => (
					<span class="caption-12-medium truncate text-white">{labelText()}</span>
				)}
			>
				{(p) => (
					<MultiselectTagFilter
						id={`fruit-${p.item().id}`}
						isSelected={p.isSelected}
						setIsSelected={() =>
							setSelected((prev) => {
								const id = p.item().id;
								if (id in prev) {
									const next = { ...prev };
									delete next[id];
									return next;
								}
								return { ...prev, [id]: true };
							})
						}
					>
						<FruitItemContent fruit={p.item()} />
					</MultiselectTagFilter>
				)}
			</DropDownPicker>
		</div>
	);
};

const PickerWithSlotsDemo = () => {
	const [active, setActive] = createSignal(0);
	const [search, setSearch] = createSignal("");
	const filtered = () =>
		FRUITS.filter((f) => f.name.toLowerCase().includes(search().toLowerCase()));

	return (
		<div class="w-64">
			<DropDownPicker
				mode="singleSelect"
				values={filtered()}
				getActiveIndex={active()}
				setActiveIndex={(idx) => setActive(idx)}
				RenderTopItemsSlot
				TopItemsSlot={
					<input
						type="text"
						placeholder="Search…"
						value={search()}
						onInput={(e) => setSearch(e.currentTarget.value)}
						class="caption-12-regular w-full rounded-md bg-white/10 px-2 py-1.5 text-white outline-none placeholder:text-white/50"
					/>
				}
				RenderBottomItemsSlot
				BottomItemsSlot={
					<div class="sticky bottom-0 mt-1 w-full rounded-md bg-[#202020] pt-1">
						<Button
							size="small"
							variant="PrimaryAccent"
							class="w-full justify-center"
							onClick={() => setSearch("")}
						>
							Reset search
						</Button>
					</div>
				}
				labelComponent={(item) => (
					<FruitLabel fruit={item ?? { id: "_", name: "Pick a fruit" }} />
				)}
			>
				{(item) => <FruitItemContent fruit={item()} />}
			</DropDownPicker>
		</div>
	);
};

export const AllDropDownsShowcase: Story = {
	name: "All dropdowns — unified table",
	parameters: {
		layout: "fullscreen"
	},
	render: () => (
		<div class="box-border min-h-screen w-full bg-background-content-tertiary p-4 pb-64">
			<table class="w-full min-w-[1100px] border-collapse text-left">
				<thead>
					<tr class="border-border-secondary border-b">
						<th class="caption-12-medium w-56 p-3 text-text-secondary">
							Component / Variant
						</th>
						<th class="caption-12-medium p-3 text-text-secondary">
							size="small" / default
						</th>
						<th class="caption-12-medium p-3 text-text-secondary">size="medium"</th>
						<th class="caption-12-medium p-3 text-text-secondary">size="large"</th>
						<th class="caption-12-medium p-3 text-text-secondary">extra</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">DropDown / default</td>
						<td class="p-3" colspan={3}>
							<SimpleDropDownDemo />
						</td>
						<td class="p-3">
							<NoArrowDropDownDemo />
						</td>
					</tr>
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">DropDown / rich</td>
						<td class="p-3" colspan={4}>
							<RichDropDownDemo />
						</td>
					</tr>

					<For each={PICKER_VARIANTS}>
						{(variant) => (
							<tr class="border-border-secondary border-b align-top">
								<td class="p-3 font-mono text-2xs text-text-primary">
									DropDownPicker / variant="{variant}"
								</td>
								<For each={PICKER_SIZES}>
									{(size) => (
										<td class="p-3">
											<SingleSelectPicker
												values={COUNTRIES}
												size={size}
												variant={variant}
											/>
										</td>
									)}
								</For>
								<td class="p-3 text-2xs text-text-tertiary">—</td>
							</tr>
						)}
					</For>

					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">
							DropDownPicker / multiSelect
						</td>
						<td class="p-3" colspan={4}>
							<MultiSelectPicker items={FRUITS} />
						</td>
					</tr>

					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">
							DropDownPicker / Top + Bottom slots
						</td>
						<td class="p-3" colspan={4}>
							<PickerWithSlotsDemo />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
};

export const DropDownDefault: Story = {
	name: "DropDown — Default",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SimpleDropDownDemo />
		</div>
	)
};

export const DropDownNoArrow: Story = {
	name: "DropDown — Without arrow",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<NoArrowDropDownDemo />
		</div>
	)
};

export const DropDownRich: Story = {
	name: "DropDown — Rich content",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<RichDropDownDemo />
		</div>
	)
};

export const PickerSingleSelect: Story = {
	name: "DropDownPicker — Single select",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<SingleSelectPicker values={COUNTRIES} />
		</div>
	)
};

export const PickerMultiSelect: Story = {
	name: "DropDownPicker — Multi select",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<MultiSelectPicker items={FRUITS} />
		</div>
	)
};

export const PickerWithSlots: Story = {
	name: "DropDownPicker — With Top/Bottom slots",
	render: () => (
		<div class="bg-background-content-tertiary p-8">
			<PickerWithSlotsDemo />
		</div>
	)
};

interface PlaygroundArgs {
	component: "DropDown" | "DropDownPicker";
	pickerMode: "singleSelect" | "multiSelect";
	pickerVariant: "dark" | "TertiaryOverlay" | "PrimaryAccent";
	pickerSize: moleculesElementsSizes;
	hideArrow: boolean;
	withTopSlot: boolean;
	withBottomSlot: boolean;
	itemsCount: number;
	triggerLabel: string;
}

const PlaygroundDropDown = (props: PlaygroundArgs) => (
	<DropDown
		btnContent={props.triggerLabel}
		isNeedToHiderArrow={props.hideArrow}
		btnClass="bg-interaction-violet hover:bg-interaction-violet-hv"
	>
		<For each={Array.from({ length: props.itemsCount })}>
			{(_, i) => (
				<button
					type="button"
					class="caption-12-regular w-full rounded-md px-2 py-1.5 text-left text-white hover:bg-white/10"
				>
					Item #{i() + 1}
				</button>
			)}
		</For>
	</DropDown>
);

const PlaygroundPicker = (props: PlaygroundArgs) => {
	const items = () => FRUITS.slice(0, props.itemsCount);
	const [active, setActive] = createSignal(0);
	const [selected, setSelected] = createSignal<Record<string, boolean>>({});

	if (props.pickerMode === "multiSelect") {
		return (
			<div class="w-64">
				<DropDownPicker
					mode="multiSelect"
					uniqueValueProp="id"
					values={items()}
					getActiveIndex={selected()}
					setActiveIndex={(item) =>
						setSelected((prev) => {
							if (item.id in prev) {
								const next = { ...prev };
								delete next[item.id];
								return next;
							}
							return { ...prev, [item.id]: true };
						})
					}
					size={props.pickerSize}
					variant={props.pickerVariant}
					RenderTopItemsSlot={props.withTopSlot}
					TopItemsSlot={
						<div class="caption-11-regular w-full px-2 pb-2 text-white/70">
							{props.triggerLabel}
						</div>
					}
					RenderBottomItemsSlot={props.withBottomSlot}
					BottomItemsSlot={
						<div class="sticky bottom-0 w-full pt-1">
							<Button
								size="small"
								variant="PrimaryAccent"
								class="w-full justify-center"
								onClick={() => setSelected({})}
							>
								Clear all
							</Button>
						</div>
					}
					labelComponent={() => (
						<span class="caption-12-medium truncate text-white">
							{Object.keys(selected()).length === 0
								? props.triggerLabel
								: `${Object.keys(selected()).length} selected`}
						</span>
					)}
				>
					{(p) => (
						<MultiselectTagFilter
							id={`pg-${p.item().id}`}
							isSelected={p.isSelected}
							setIsSelected={() =>
								setSelected((prev) => {
									const id = p.item().id;
									if (id in prev) {
										const next = { ...prev };
										delete next[id];
										return next;
									}
									return { ...prev, [id]: true };
								})
							}
						>
							<FruitItemContent fruit={p.item()} />
						</MultiselectTagFilter>
					)}
				</DropDownPicker>
			</div>
		);
	}

	return (
		<div class="w-64">
			<DropDownPicker
				mode="singleSelect"
				values={items()}
				getActiveIndex={active()}
				setActiveIndex={(idx) => setActive(idx)}
				size={props.pickerSize}
				variant={props.pickerVariant}
				RenderTopItemsSlot={props.withTopSlot}
				TopItemsSlot={
					<div class="caption-11-regular w-full px-2 pb-2 text-white/70">
						{props.triggerLabel}
					</div>
				}
				RenderBottomItemsSlot={props.withBottomSlot}
				BottomItemsSlot={
					<div class="sticky bottom-0 w-full pt-1">
						<Button
							size="small"
							variant="PrimaryAccent"
							class="w-full justify-center"
							onClick={() => setActive(0)}
						>
							Reset
						</Button>
					</div>
				}
				labelComponent={(item) => (
					<FruitLabel fruit={item ?? { id: "_", name: props.triggerLabel }} />
				)}
			>
				{(item) => <FruitItemContent fruit={item()} />}
			</DropDownPicker>
		</div>
	);
};

const PlaygroundView = (props: PlaygroundArgs) => (
	<div class="flex min-h-[420px] flex-col gap-4 bg-background-content-tertiary p-6">
		<div class="rounded-xl border border-border-secondary bg-white p-4">
			<div class="caption-13-medium mb-3 text-text-primary">Live preview</div>
			<Show when={props.component === "DropDown"} fallback={<PlaygroundPicker {...props} />}>
				<PlaygroundDropDown {...props} />
			</Show>
		</div>
	</div>
);

export const Playground: StoryObj<PlaygroundArgs> = {
	name: "Playground",
	argTypes: {
		component: {
			control: "inline-radio",
			options: ["DropDown", "DropDownPicker"],
			table: { category: "Component" }
		},
		triggerLabel: { control: "text", table: { category: "Content" } },
		itemsCount: {
			control: { type: "range", min: 1, max: 6, step: 1 },
			table: { category: "Content" }
		},
		hideArrow: {
			control: "boolean",
			description: "Только для DropDown — скрыть стрелку-индикатор",
			table: { category: "DropDown" }
		},
		pickerMode: {
			control: "inline-radio",
			options: ["singleSelect", "multiSelect"],
			table: { category: "DropDownPicker" }
		},
		pickerVariant: {
			control: "inline-radio",
			options: ["dark", "TertiaryOverlay", "PrimaryAccent"],
			table: { category: "DropDownPicker" }
		},
		pickerSize: {
			control: "inline-radio",
			options: ["small", "medium", "large"],
			table: { category: "DropDownPicker" }
		},
		withTopSlot: { control: "boolean", table: { category: "DropDownPicker / Slots" } },
		withBottomSlot: { control: "boolean", table: { category: "DropDownPicker / Slots" } }
	},
	args: {
		component: "DropDownPicker",
		triggerLabel: "Pick an item",
		itemsCount: 4,
		hideArrow: false,
		pickerMode: "singleSelect",
		pickerVariant: "dark",
		pickerSize: "medium",
		withTopSlot: false,
		withBottomSlot: false
	},
	render: (args: PlaygroundArgs) => <PlaygroundView {...args} />
};
