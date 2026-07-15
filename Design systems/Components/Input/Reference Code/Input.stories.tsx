import { useEditable } from "@ark-ui/solid";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { createSignal, For } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs";
import type { VariantProps } from "tailwind-variants";
import type { moleculesElementsSizes } from "~/solidJs/shared/helpers/types/MoleculesElementsSizes";
import { SearchableMenuList, StyledEditable } from "~/solidJs/shared/ui";
import { TextAreaChat } from "~/solidJs/shared/ui/molecules/TextAreaChat";
import { InputLabelError, type inputStyles, Input as TextInput } from "./Input";

type InputColorVariant = NonNullable<VariantProps<typeof inputStyles>["color"]>;

const INPUT_VARIANTS = [
	"default",
	"outline",
	"Gray"
] as const satisfies readonly InputColorVariant[];

const INPUT_SIZES = [
	"small",
	"medium",
	"large"
] as const satisfies readonly moleculesElementsSizes[];

const inputStylesDoc = [
	{
		name: "Input — Base (все варианты)",
		description: "Общие стили, применяются к каждому инпуту независимо от variant/size",
		entries: [
			{ property: "width", value: "100%" },
			{ property: "height", value: "auto (по контенту)" },
			{
				property: "border-radius (base)",
				value: "6px",
				description: "Переопределяется в size/variant"
			},
			{ property: "border", value: "1px solid" },
			{ property: "transition", value: "opacity" },
			{ property: "placeholder при фокусе", value: "opacity: 0" },
			{ property: "outline при фокусе", value: "none" },
			{ property: "placeholder цвет", value: "#999999 (--text-secondary)" },
			{ property: "placeholder font-weight", value: "500 (medium)" }
		]
	},
	{
		name: "Input — Size: small",
		entries: [
			{ property: "padding", value: "8px 16px" },
			{ property: "font-size", value: "~10px (2xs preset)" },
			{ property: "font-weight", value: "500 (medium)" }
		]
	},
	{
		name: "Input — Size: medium",
		entries: [
			{ property: "padding", value: "12px 16px" },
			{ property: "font-size", value: "14px" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "border-radius", value: "8px" }
		]
	},
	{
		name: "Input — Size: large",
		entries: [
			{ property: "padding", value: "16px 24px" },
			{ property: "font-size", value: "~10px (2xs preset)" },
			{ property: "font-weight", value: "500 (medium)" },
			{ property: "border-radius", value: "12px" }
		]
	},
	{
		name: "Input — Variant: default",
		entries: [
			{ property: "background", value: "#FFFFFF" },
			{ property: "border-color", value: "#D1D5DB (gray-300, Tailwind default)" },
			{ property: "text color", value: "наследуется от родителя (currentColor)" }
		]
	},
	{
		name: "Input — Variant: outline",
		entries: [
			{ property: "background", value: "transparent" },
			{ property: "border-color", value: "#C9C9C9 (--border-gray-dark)" },
			{ property: "border-radius", value: "8px" },
			{ property: "placeholder color", value: "#999999 (--text-secondary)" }
		]
	},
	{
		name: "Input — Variant: Gray",
		description: "Основной инпут для форм (обычно используется с подписью/ошибкой)",
		entries: [
			{ property: "background", value: "#F7F7F7 (--background-gray-light)" },
			{ property: "border", value: "none" },
			{ property: "ring (default)", value: "1px solid #DDE1E6 (--border-tertiary)" },
			{ property: "ring (focus)", value: "2px solid #7C4AE7 (--background-violet)" },
			{ property: "text color", value: "#2D2D2D (--text-primary)" },
			{ property: "placeholder color", value: "#999999 (--text-secondary)" },
			{
				property: "padding override (size=medium)",
				value: "12px (compound variant: Gray + medium → p-3)"
			}
		]
	},
	{
		name: "Input — Disabled state",
		description: "Применяется поверх любого варианта через prop disabled",
		entries: [
			{ property: "opacity", value: "50%" },
			{ property: "pointer-events", value: "none (некликабелен)" }
		]
	},
	{
		name: "Input — подпись (label) сверху",
		description: "Применимо к любому варианту Input. Лейбл располагается над инпутом",
		entries: [
			{ property: "layout", value: "flex column (лейбл сверху, инпут снизу)" },
			{ property: "gap между лейблом и инпутом", value: "8px" },
			{ property: "label font-size", value: "14px" },
			{ property: "label font-weight", value: "500 (medium)" },
			{ property: "label color", value: "#555555 (--text-secondary-v2)" }
		]
	},
	{
		name: "Input — сообщение об ошибке (снизу)",
		description: "Применимо к любому варианту Input. Текст ошибки показывается под инпутом",
		entries: [
			{ property: "gap между инпутом и ошибкой", value: "2px" },
			{ property: "error font-size", value: "10px" },
			{ property: "error font-weight", value: "500 (medium)" },
			{ property: "error color", value: "#F27807 (--background-orange)" }
		]
	},
	{
		name: "TextAreaChat — чат-бар",
		description: "Поле ввода сообщений. Контейнер + textarea + кнопка отправки",
		entries: [
			{ property: "контейнер background", value: "#F3F3F4 (--interaction-grey-light)" },
			{ property: "контейнер border-radius", value: "20px" },
			{ property: "контейнер padding", value: "6px 6px 6px 16px" },
			{ property: "textarea font-size", value: "12px" },
			{ property: "textarea font-weight", value: "500 (medium)" },
			{ property: "textarea background", value: "transparent" },
			{ property: "textarea text color", value: "#2D2D2D (--text-primary)" },
			{ property: "textarea placeholder color", value: "#999999 (--text-secondary)" },
			{ property: "textarea max-height", value: "80px (авто-ресайз до этого предела)" },
			{ property: "textarea outline", value: "none" },
			{ property: "кнопка отправки background", value: "#2D2D2D (--interaction-black)" },
			{ property: "кнопка отправки border-radius", value: "16px" },
			{ property: "кнопка отправки padding", value: "10px" },
			{
				property: "кнопка отправки (hover) background",
				value: "#3B3B3B (--interaction-black-hv)"
			}
		]
	},
	{
		name: "EditableClosedComponent",
		description: "Ark UI Editable — клик по тексту превращает его в поле ввода",
		entries: [
			{ property: "border-radius (preview area)", value: "6px слева" },
			{ property: "focus outline color", value: "#7C4AE7 (--background-violet)" }
		]
	}
];

const storybookQueryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false, staleTime: 0 }
	}
});

type SearchDemoItem = { id: string; name: string };

const TextAreaChatDemo = () => {
	const [text, setText] = createSignal("");
	return (
		<div class="w-full max-w-xl">
			<TextAreaChat
				inputState={text()}
				onInputChange={(e) => setText(e.currentTarget.value)}
				onSubmit={() => undefined}
				renderFileInput={false}
				placeholder="Type a message…"
			/>
		</div>
	);
};

const EditableFieldDemo = () => {
	const [name, setName] = createSignal("My project");
	const api = useEditable(() => ({
		placeholder: "Name",
		value: name(),
		onValueChange: (d) => setName(d.value)
	}));
	return (
		<div class="max-w-xs rounded-lg border border-border-secondary p-3">
			<StyledEditable.EditableClosedComponent api={api} />
		</div>
	);
};

const SearchableMenuDemo = () => {
	const [value, setValue] = createSignal<SearchDemoItem | undefined>();
	const pool: SearchDemoItem[] = [
		{ id: "1", name: "Apple" },
		{ id: "2", name: "Apricot" },
		{ id: "3", name: "Banana" },
		{ id: "4", name: "Blueberry" }
	];
	return (
		<QueryClientProvider client={storybookQueryClient}>
			<div class="max-w-md">
				<SearchableMenuList.SearchableMenu
					name="storybook-searchable"
					labelContent="Searchable field"
					value={value()}
					onChange={setValue}
					minSearchLength={1}
					searchFn={async ({ searchString }) => {
						const q = searchString.toLowerCase();
						await new Promise((r) => setTimeout(r, 120));
						return pool.filter((x) => x.name.toLowerCase().includes(q));
					}}
					extract={{
						extractLabelFromItem: (i) => i.name,
						extractIdFromItem: (i) => i.id,
						extractName: (i) => i.name
					}}
					placeholders={{
						searchPlaceholder: "Type 1+ characters…",
						triggerPlaceholder: "Select item",
						emptyPlaceholder: "No matches"
					}}
				/>
			</div>
		</QueryClientProvider>
	);
};

const SearchableMenuMultipleDemo = () => {
	const [value, setValue] = createSignal<SearchDemoItem[]>([]);
	const pool: SearchDemoItem[] = [
		{ id: "a", name: "Alpha" },
		{ id: "b", name: "Beta" },
		{ id: "c", name: "Gamma" }
	];
	return (
		<QueryClientProvider client={storybookQueryClient}>
			<div class="max-w-md">
				<SearchableMenuList.SearchableMenuMultipple
					name="storybook-searchable-multi"
					labelContent="Multi select"
					value={value()}
					onChange={setValue}
					minSearchLength={1}
					searchFn={async ({ searchString }) => {
						const q = searchString.toLowerCase();
						await new Promise((r) => setTimeout(r, 80));
						return pool.filter((x) => x.name.toLowerCase().includes(q));
					}}
					extract={{
						extractLabelFromItem: (i) => i.name,
						extractIdFromItem: (i) => i.id,
						extractName: (i) => i.name
					}}
				/>
			</div>
		</QueryClientProvider>
	);
};

const meta: Meta<typeof TextInput> = {
	title: "Atoms/Input",
	component: TextInput,
	parameters: {
		layout: "fullscreen",
		componentStyles: inputStylesDoc
	},
	tags: ["autodocs"]
};

export default meta;

type Story = StoryObj;

export const AllInputsShowcase: Story = {
	name: "All inputs — unified table",
	render: () => (
		<div class="w-full overflow-x-auto p-4">
			<table class="w-full min-w-[1180px] border-collapse text-left">
				<thead>
					<tr class="border-border-secondary border-b">
						<th class="caption-12-medium w-52 p-3 text-text-secondary">
							Component / Variant
						</th>
						<th class="caption-12-medium p-3 text-text-secondary">size="small"</th>
						<th class="caption-12-medium p-3 text-text-secondary">size="medium"</th>
						<th class="caption-12-medium p-3 text-text-secondary">size="large"</th>
						<th class="caption-12-medium p-3 text-text-secondary">disabled</th>
						<th class="caption-12-medium p-3 text-text-secondary">
							with label + error
						</th>
					</tr>
				</thead>
				<tbody>
					{/* Input — все варианты × все размеры + disabled + label/error */}
					<For each={[...INPUT_VARIANTS]}>
						{(variant) => (
							<tr class="border-border-secondary border-b align-top">
								<td class="p-3 font-mono text-2xs text-text-primary">
									Input / {variant}
								</td>
								<For each={[...INPUT_SIZES]}>
									{(size) => (
										<td class="p-3">
											<div class="rounded-md p-1">
												<TextInput
													variant={variant}
													size={size}
													placeholder="Placeholder"
												/>
											</div>
										</td>
									)}
								</For>
								<td class="p-3">
									<div class="rounded-md p-1">
										<TextInput
											variant={variant}
											size="medium"
											disabled
											placeholder="Disabled"
										/>
									</div>
								</td>
								<td class="p-3">
									<div class="min-w-[220px]">
										<InputLabelError
											id={`demo-${variant}-lblerr`}
											labelContent="Password"
											errorMessage="Too short"
										>
											<TextInput
												id={`demo-${variant}-lblerr`}
												variant={variant}
												size="medium"
												placeholder="••••••••"
											/>
										</InputLabelError>
									</div>
								</td>
							</tr>
						)}
					</For>

					{/* TextAreaChat */}
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">TextAreaChat</td>
						<td class="p-3" colspan={3}>
							<TextAreaChatDemo />
						</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
					</tr>

					{/* EditableClosedComponent */}
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">
							EditableClosedComponent
						</td>
						<td class="p-3" colspan={3}>
							<EditableFieldDemo />
						</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
					</tr>

					{/* SearchableMenu */}
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">
							SearchableMenu (single)
						</td>
						<td class="p-3" colspan={3}>
							<SearchableMenuDemo />
						</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
					</tr>
					<tr class="border-border-secondary border-b align-top">
						<td class="p-3 font-mono text-2xs text-text-primary">
							SearchableMenuMultipple
						</td>
						<td class="p-3" colspan={3}>
							<SearchableMenuMultipleDemo />
						</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
						<td class="p-3 text-2xs text-text-tertiary">—</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
};
