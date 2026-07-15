import type { Component, JSX } from "solid-js";

type ButtonSwitcherImageItemsContainerProps = {
	children: JSX.Element;
};

export const SwitcherImageItemsContainer: Component<ButtonSwitcherImageItemsContainerProps> = (
	props
) => {
	return (
		<ul
			class={
				"styledScrollBar m-0 flex h-full max-h-[600px] min-h-[100px] w-full flex-wrap gap-2 overflow-y-scroll p-1"
			}
		>
			{props.children}
		</ul>
	);
};
