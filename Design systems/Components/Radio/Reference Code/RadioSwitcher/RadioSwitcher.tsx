import { For } from "solid-js";
import classes from "./RadioSwitcher.module.sass";

type RadioSwitcherProps<
	ItemType extends {
		label: string;
		value: string;
	}
> = {
	values: ItemType[];
	activeValue: ItemType["value"];
	onChange?: (value: ItemType["value"]) => void;
	getUniqueId?: (item: ItemType) => string;
};

export const RadioSwitcher = <
	ItemType extends {
		label: string;
		value: string;
	}
>(
	props: RadioSwitcherProps<ItemType>
) => {
	return (
		<For each={props.values}>
			{(mode) => (
				<div class={classes.itemContainer}>
					<input
						hidden
						class={classes.switcher}
						id={props.getUniqueId?.(mode) || mode.value}
						type="radio"
						value={mode.value}
						checked={props.activeValue === mode.value}
						onchange={(_e) => {
							props.onChange?.(mode.value);
						}}
					/>
					<label class={classes.switcher} for={props.getUniqueId?.(mode) || mode.value}>
						{mode.label}
					</label>
					<label for={props.getUniqueId?.(mode) || mode.value}>{mode.label}</label>
				</div>
			)}
		</For>
	);
};
