import type { Component, JSXElement } from "solid-js";
import { Toggle } from "~/solidJs/shared/ui";
import classes from "./MultiTagFilter.module.scss";

type MultiselectTagFilterProps = {
	isSelected: boolean;
	setIsSelected: (isSelected: boolean) => void;
	children: JSXElement;
	id?: string;
};

export const MultiselectTagFilter: Component<MultiselectTagFilterProps> = (props) => {
	return (
		<div class={classes.container}>
			<Toggle
				id={props.id}
				checked={props.isSelected}
				onChange={(e) => {
					props.setIsSelected(e.currentTarget.checked);
				}}
			/>
			{props.children}
		</div>
	);
};
