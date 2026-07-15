import type { Component, JSX } from "solid-js";

type ButtonSwitcherBtnItemsContainerProps = {
	children: JSX.Element;
};

export const ButtonSwitcherBtnItemsContainer: Component<ButtonSwitcherBtnItemsContainerProps> = (
	props
) => {
	return <ul class={"flex w-max rounded-md border-1 border-[#DFD4FE] p-0"}>{props.children}</ul>;
};
export const ButtonSwitcherBtnItemsContainerPremiumBanner: Component<
	ButtonSwitcherBtnItemsContainerProps
> = (props) => {
	return (
		<ul class={"flex rounded-full border-none bg-white p-1 outline-none"}>{props.children}</ul>
	);
};
