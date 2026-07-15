import { type Accessor, type Component, createMemo, Index } from "solid-js";

// export type baseSwitcherItemType = Record<string, any>
type RadioSwitcherProps<ItemType> = {
	values: ItemType[];
	activeIndex: number | undefined | Record<string, boolean>;
	uniqueItemProp?: string;
	children: Component<{
		isSelected: Accessor<boolean>;
		index: Accessor<number>;
		item: Accessor<ItemType>;
	}>;
};

export const ButtonSwitcher = <ItemType,>(props: RadioSwitcherProps<ItemType>) => {
	return (
		<Index each={props.values}>
			{(item, index) => {
				const isSelected = createMemo(() => {
					if (typeof props.activeIndex === "object") {
						if (props.uniqueItemProp) {
							const item_ = item() as Record<any, any>;
							return item_[props.uniqueItemProp] in props.activeIndex;
						}
						return index in props.activeIndex;
					}
					return props.activeIndex === index;
				});
				return props.children({
					isSelected,
					index: () => index,
					item
				});
			}}
		</Index>
	);
};
