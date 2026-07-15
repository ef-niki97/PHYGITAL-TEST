import { createListCollection, Select } from "@ark-ui/solid";
import { useQuery } from "@tanstack/solid-query";
import { Check, X } from "lucide-solid";
import { createSignal, Index, Match, Suspense, Switch } from "solid-js";
import { Portal, untrack } from "solid-js/web";
import { Button, ErrorMessage, Input, InputLabelError, Spinner } from "~/solidJs/shared";
import { StyledSelect } from "../Select";
export interface PlaceholderProps {
	searchPlaceholder?: string;
	triggerPlaceholder?: string;
	emptyPlaceholder?: string;
	errorPlaceholder?: string;
}

export interface ExtractProps<ItemType> {
	extractLabelFromItem: (item: ItemType) => string;
	extractIdFromItem: (item: ItemType) => string;
	extractName: (item: ItemType) => string; // Used to set search input text on select
}

export type SearchFunction<ItemType> = (props: { searchString: string }) => Promise<ItemType[]>;

export interface SearchableMenuProps<ItemType> {
	name: string;
	labelContent: string;
	value: ItemType | undefined;
	onChange: (item: ItemType | undefined) => void;
	errorMessage?: string;
	searchFn: SearchFunction<ItemType>;
	extract: ExtractProps<ItemType>;
	placeholders?: PlaceholderProps;
	minSearchLength?: number; // Minimum characters required to trigger search (default: 2)
}

export interface SearchableMenuPropsMultipple<ItemType> {
	name: string;
	labelContent: string;
	value: ItemType[] | undefined;
	onChange: (item: ItemType[]) => void;
	errorMessage?: string;
	searchFn: SearchFunction<ItemType>;
	extract: ExtractProps<ItemType>;
	placeholders?: PlaceholderProps;
	minSearchLength?: number; // Minimum characters required to trigger search (default: 2)
}

export const SearchableMenu = <ListItem,>(props: SearchableMenuProps<ListItem>) => {
	const [getSearchInput, setSearchInput] = createSignal("");
	const [getItems, setItems] = createSignal<ListItem[]>([]);
	const [isMenuOpen, setIsMenuOpen] = createSignal(false);

	const minLength = () => props.minSearchLength ?? 2;

	const queryResult = useQuery(() => ({
		queryKey: ["sharedSearchableMenu", props.name, getSearchInput()],
		queryFn: async () => {
			if (!getSearchInput() || getSearchInput().length < minLength()) return [];
			return props.searchFn({ searchString: getSearchInput() });
		},
		enabled: getSearchInput().length >= minLength(),
		select: (items) => {
			setItems(items);
			return items;
		},
		staleTime: 5000
	}));

	const collection = () =>
		createListCollection<ListItem>({
			items: getItems() || [],
			itemToString: (item) => props.extract.extractLabelFromItem(item),
			itemToValue: (item) => props.extract.extractIdFromItem(item)
		});

	return (
		<InputLabelError
			id={props.name} // This id is used for the label's `for` attribute
			labelContent={props.labelContent}
			errorMessage={props.errorMessage}
		>
			<StyledSelect.Root
				collection={collection()}
				open={isMenuOpen()}
				onOpenChange={(detail) => setIsMenuOpen(detail.open)}
				value={props.value ? [props.extract.extractIdFromItem(props.value)] : []}
				onValueChange={(details) => {
					if (details.items.length > 0) {
						const selectedItem = details.items[0];
						props.onChange(selectedItem);
						return;
					}
					props.onChange(undefined);
				}}
				positioning={{ sameWidth: true }}
				closeOnSelect={true}
			>
				<StyledSelect.Control class="flex w-full gap-1">
					<StyledSelect.Trigger
						class="w-full"
						asChild={(props) => (
							<Button type="button" variant="TertiaryNeutral" {...props()} />
						)}
					>
						<StyledSelect.ValueText
							placeholder={props.placeholders?.triggerPlaceholder}
						/>
					</StyledSelect.Trigger>
					<Select.ClearTrigger
						asChild={(props) => (
							<Button type="button" variant="TertiaryNeutral" {...props()} />
						)}
					>
						Clear
					</Select.ClearTrigger>
				</StyledSelect.Control>
				<Portal>
					<StyledSelect.Positioner>
						<StyledSelect.Content>
							<Input
								id={`${props.name}-search-input`}
								name={`${props.name}-search-input`}
								value={getSearchInput()}
								autocorrect="off"
								autocomplete="off"
								onInput={(e) => setSearchInput(e.currentTarget.value)}
								placeholder={
									props?.placeholders?.searchPlaceholder || "Type to search..."
								}
								class="sticky top-0 z-10 w-full rounded-t-md border-gray-300 border-b bg-white px-4 py-2"
							/>
							<Suspense>
								<Switch>
									<Match when={queryResult.isError}>
										<div class="px-4 py-2">
											<ErrorMessage>
												{props.placeholders?.errorPlaceholder ||
													"Error fetching data"}
											</ErrorMessage>
										</div>
									</Match>
									<Match when={queryResult.isLoading}>
										<div class="flex items-center justify-center px-4 py-2 text-gray-500">
											<Spinner />
										</div>
									</Match>
									<Match
										when={
											!queryResult.isLoading &&
											queryResult.data?.length === 0 &&
											getSearchInput().length > 1
										}
									>
										<div class="px-4 py-2 text-gray-500">
											{props.placeholders?.emptyPlaceholder ||
												"No results found."}
										</div>
									</Match>
									<Match when={queryResult.data?.length}>
										<StyledSelect.ItemGroup>
											<Index each={collection().items}>
												{(item) => (
													<StyledSelect.Item
														class="w-full justify-start text-left data-[state=checked]:bg-background-gray-light"
														asChild={(props) => (
															<Button
																type="button"
																variant="AccentIcon"
																{...props()}
															/>
														)}
														item={item()}
													>
														<StyledSelect.ItemText class="label-10-medium">
															{props.extract.extractLabelFromItem(
																item()
															)}
														</StyledSelect.ItemText>
														<StyledSelect.ItemIndicator>
															<Check size={16} />
														</StyledSelect.ItemIndicator>
													</StyledSelect.Item>
												)}
											</Index>
										</StyledSelect.ItemGroup>
									</Match>
									<Match
										when={
											getSearchInput().length <= 1 && !queryResult.isFetching
										}
									>
										<div class="px-4 py-2 text-gray-400">
											Type more to search...
										</div>
									</Match>
								</Switch>
							</Suspense>
						</StyledSelect.Content>
					</StyledSelect.Positioner>
				</Portal>
				<StyledSelect.HiddenSelect />
			</StyledSelect.Root>
		</InputLabelError>
	);
};

export const SearchableMenuMultipple = <ListItem,>(
	props: SearchableMenuPropsMultipple<ListItem>
) => {
	const [getSearchInput, setSearchInput] = createSignal("");
	const [getItems, setItems] = createSignal<ListItem[]>([]);
	const [isMenuOpen, setIsMenuOpen] = createSignal(false);

	const minLength = () => props.minSearchLength ?? 2;

	const queryResult = useQuery(() => ({
		queryKey: ["sharedSearchableMenu", props.name, getSearchInput()],
		queryFn: async () => {
			if (!getSearchInput() || getSearchInput().length < minLength()) return [];
			return props.searchFn({ searchString: getSearchInput() });
		},
		enabled: getSearchInput().length >= minLength(),
		select: (items) => {
			const selectedValues = untrack(() => props.value);
			if (selectedValues) {
				items.push(...selectedValues);
			}
			setItems(items);
			return items;
		},
		staleTime: 5000
	}));

	const collection = () =>
		createListCollection<ListItem>({
			items: getItems() || [],
			itemToString: (item) => props.extract.extractLabelFromItem(item),
			itemToValue: (item) => props.extract.extractIdFromItem(item)
		});

	return (
		<InputLabelError
			id={props.name} // This id is used for the label's `for` attribute
			labelContent={props.labelContent}
			errorMessage={props.errorMessage}
		>
			<StyledSelect.Root
				multiple
				collection={collection()}
				open={isMenuOpen()}
				onOpenChange={(detail) => setIsMenuOpen(detail.open)}
				value={props.value?.map((item) => props.extract.extractIdFromItem(item))}
				onValueChange={(details) => {
					props.onChange(details.items);
				}}
				positioning={{ sameWidth: true }}
			>
				<StyledSelect.Control class="flex w-full flex-col gap-1">
					<div class="flex w-full gap-1">
						<StyledSelect.Trigger
							class="flex w-full flex-col gap-2"
							asChild={(props) => (
								<Button type="button" variant="TertiaryNeutral" {...props()} />
							)}
						>
							{props.placeholders?.triggerPlaceholder || "Select entity"}
						</StyledSelect.Trigger>
						<Select.ClearTrigger
							asChild={(props) => (
								<Button type="button" variant="TertiaryNeutral" {...props()} />
							)}
						>
							Clear
						</Select.ClearTrigger>
					</div>
					<Index each={props.value}>
						{(item) => (
							<Button
								type="button"
								onClick={() => {
									const currItem = props.extract.extractIdFromItem(item());
									props.onChange(
										props.value?.filter(
											(selected) =>
												props.extract.extractIdFromItem(selected) !==
												currItem
										) || []
									);
								}}
								variant="TertiaryNeutral"
								class="label-9-mono w-full justify-between"
								size="small"
							>
								{props.extract.extractLabelFromItem(item())}
								<X size={16} />
							</Button>
						)}
					</Index>
				</StyledSelect.Control>
				<Portal>
					<StyledSelect.Positioner>
						<StyledSelect.Content>
							<Input
								id={`${props.name}-search-input`}
								name={`${props.name}-search-input`}
								value={getSearchInput()}
								autocorrect="off"
								autocomplete="off"
								onInput={(e) => setSearchInput(e.currentTarget.value)}
								placeholder={
									props?.placeholders?.searchPlaceholder || "Type to search..."
								}
								class="sticky top-0 z-10 w-full rounded-t-md border-gray-300 border-b bg-white px-4 py-2"
							/>
							<Suspense>
								<Switch>
									<Match when={queryResult.isError}>
										<div class="px-4 py-2">
											<ErrorMessage>
												{props.placeholders?.errorPlaceholder ||
													"Error fetching data"}
											</ErrorMessage>
										</div>
									</Match>
									<Match when={queryResult.isLoading}>
										<div class="flex items-center justify-center px-4 py-2 text-gray-500">
											<Spinner />
										</div>
									</Match>
									<Match
										when={
											!queryResult.isLoading &&
											queryResult.data?.length === 0 &&
											getSearchInput().length > 1
										}
									>
										<div class="px-4 py-2 text-gray-500">
											{props.placeholders?.emptyPlaceholder ||
												"No results found."}
										</div>
									</Match>
									<Match when={queryResult.data?.length}>
										<StyledSelect.ItemGroup>
											<Index each={collection().items}>
												{(item) => (
													<StyledSelect.Item
														class="w-full justify-start text-left data-[state=checked]:bg-background-gray-light"
														asChild={(props) => (
															<Button
																type="button"
																variant="AccentIcon"
																{...props()}
															/>
														)}
														item={item()}
													>
														<StyledSelect.ItemText class="label-10-medium">
															{props.extract.extractLabelFromItem(
																item()
															)}
														</StyledSelect.ItemText>
														<StyledSelect.ItemIndicator>
															<Check size={16} />
														</StyledSelect.ItemIndicator>
													</StyledSelect.Item>
												)}
											</Index>
										</StyledSelect.ItemGroup>
									</Match>
									<Match
										when={
											getSearchInput().length <= 1 && !queryResult.isFetching
										}
									>
										<div class="px-4 py-2 text-gray-400">
											Type more to search...
										</div>
									</Match>
								</Switch>
							</Suspense>
						</StyledSelect.Content>
					</StyledSelect.Positioner>
				</Portal>
				<StyledSelect.HiddenSelect />
			</StyledSelect.Root>
		</InputLabelError>
	);
};
