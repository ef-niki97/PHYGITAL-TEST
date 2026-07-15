//@ts-nocheck
import type { Accessor, Component, JSXElement, Setter } from "solid-js";
import { createEffect, createSignal, type JSX, on, Show } from "solid-js";
import { twJoin } from "tailwind-merge";
import ArrowIcon from "~/Icons/arrow.svg?component-solid";
import type { moleculesElementsSizes } from "~/solidJs/shared/helpers/types/MoleculesElementsSizes";
import { Button, ButtonSwitcher, type btnSizes, type btnVariants } from "~/solidJs/shared/ui";
import classes from "./DropDownPicker.module.scss";

type DropDownPickerContainerProps = {
	children: JSX.Element;
	labelContent: JSX.Element;
	size?: moleculesElementsSizes;
	moveUpEvent?: () => void;
	moveDownEvent?: () => void;
	disableCloseOnBlur?: boolean;
	isForcedOpenClose?: boolean;
	setIsForcedOpenClose?: Setter<boolean>;
	variant?: btnVariants;
};

export const DropDownPickerContainer: Component<DropDownPickerContainerProps> = (props) => {
	const [getIsOpen, setIsOpen] = createSignal(false);

	const keydownHandler = (e: KeyboardEvent) => {
		if (!getIsOpen()) return;
		if (e.which === 38) {
			e.preventDefault();
			props.moveUpEvent?.();
		} else if (e.which === 40) {
			e.preventDefault();
			props.moveDownEvent?.();
		}
	};

	return (
		<Button
			onClick={() => {
				props?.setIsForcedOpenClose?.((prev) => !prev) || setIsOpen((prev) => !prev);
			}}
			tabIndex={0}
			onKeyDown={keydownHandler}
			onBlur={() => {
				if (props.disableCloseOnBlur) return;
				props?.setIsForcedOpenClose?.((prev) => !prev) || setIsOpen(false);
			}}
			class={"!flex-row !items-center !justify-between flex w-full gap-2 py-1 text-2xs"}
			size={props.size}
			variant={props.variant || "dark"}
			type={"button"}
		>
			<div class="min-w-0 flex-1 text-left">{props.labelContent}</div>
			<ArrowIcon
				class={twJoin(getIsOpen() ? "rotate-90" : "-rotate-90", "h-3 [&>path]:fill-white")}
			/>
			<Show
				when={props.isForcedOpenClose !== undefined ? props.isForcedOpenClose : getIsOpen()}
			>
				<ul
					onClick={(e) => {
						e.stopPropagation();
					}}
					class={classes.pickerItemsContainer}
				>
					{props.children}
				</ul>
			</Show>
		</Button>
	);
};
type DropDownPickerItemProps = {
	onClick: () => void;
	children: JSX.Element;
	isSelected: boolean;
	isNeedToSkipScroll?: boolean;
};
export const DropDownPickerItem: Component<DropDownPickerItemProps> = (props) => {
	let refLi: HTMLLIElement;

	createEffect(() => {
		if (props.isNeedToSkipScroll) return;
		if (props.isSelected) {
			refLi.scrollIntoView({
				block: "nearest"
			});
		}
	});
	return (
		<li
			ref={(el) => {
				refLi = el;
			}}
			onclick={props.onClick}
			class={`${classes.pickerItem} ${props.isSelected ? classes.selectedPickerItem : ""}`}
		>
			{props.children}
		</li>
	);
};
export type DropDownModes = "singleSelect" | "multiSelect";

type DropDownPickerProps<valueItem> = {
	RenderTopItemsSlot?: boolean;
	TopItemsSlot?: JSXElement;
	RenderBottomItemsSlot?: boolean;
	BottomItemsSlot?: JSXElement;
	isForcedOpenClose?: boolean;
	variant?: btnVariants;
	size?: btnSizes;
	setIsForcedOpenClose?: Setter<boolean>;
} & (
	| {
			values: valueItem[];
			getActiveIndex: number;
			setActiveIndex: (newVal: number, values: valueItem[]) => void;
			children: Component<Accessor<valueItem>>;
			labelComponent: Component<valueItem>;
			mode?: "singleSelect";
	  }
	| {
			values: valueItem[];
			getActiveIndex: Record<string, boolean>;
			setActiveIndex: (item: valueItem, values: valueItem[]) => void;
			children: Component<{ index: number; item: Accessor<valueItem>; isSelected: boolean }>;
			uniqueValueProp?: string;
			labelComponent: Component;
			mode: "multiSelect";
	  }
);
export const DropDownPicker = <valueItem,>(props: DropDownPickerProps<valueItem>) => {
	const handleMoveUp = () => {
		if (props.mode === "multiSelect") return;
		props.setActiveIndex(
			!props.getActiveIndex ? props.values.length - 1 : props.getActiveIndex - 1,
			props.values
		);
	};

	const handleMoveDown = () => {
		if (props.mode === "multiSelect") return;
		props.setActiveIndex(
			((prev) => {
				if (prev === undefined) return 0;
				return prev === props.values.length - 1 ? 0 : ++prev;
			})(props.getActiveIndex),
			props.values
		);
	};

	createEffect(
		on(
			() => props.values,
			(vals) => {
				if (props.mode === "multiSelect") return;
				if (vals.length - 1 < props.getActiveIndex) props.setActiveIndex(0, props.values);
			}
		)
	);

	return (
		<DropDownPickerContainer
			labelContent={
				props.mode === "multiSelect" ? (
					<props.labelComponent />
				) : (
					props.labelComponent(props.values[props.getActiveIndex])
				)
			}
			moveUpEvent={handleMoveUp}
			size={props.size}
			disableCloseOnBlur={props.RenderTopItemsSlot}
			moveDownEvent={handleMoveDown}
			variant={props.variant}
			isForcedOpenClose={props.isForcedOpenClose}
			setIsForcedOpenClose={props.setIsForcedOpenClose}
		>
			<Show when={props.RenderTopItemsSlot}>{props.TopItemsSlot}</Show>
			<ButtonSwitcher
				uniqueItemProp={props.mode === "multiSelect" ? props.uniqueValueProp : undefined}
				values={props.values}
				activeIndex={props.getActiveIndex}
			>
				{(dropDownProps) => (
					<DropDownPickerItem
						onClick={() => {
							props.mode === "multiSelect"
								? props.setActiveIndex(dropDownProps.item(), props.values)
								: props.setActiveIndex(dropDownProps.index(), props.values);
						}}
						isSelected={dropDownProps.isSelected()}
						isNeedToSkipScroll={props.mode === "multiSelect"}
					>
						{props.mode === "multiSelect" ? (
							<props.children
								index={dropDownProps.index()}
								isSelected={dropDownProps.isSelected()}
								item={dropDownProps.item}
							/>
						) : (
							props.children(dropDownProps.item)
						)}
					</DropDownPickerItem>
				)}
			</ButtonSwitcher>
			<Show when={props.RenderBottomItemsSlot}>{props.BottomItemsSlot}</Show>
		</DropDownPickerContainer>
	);
};
