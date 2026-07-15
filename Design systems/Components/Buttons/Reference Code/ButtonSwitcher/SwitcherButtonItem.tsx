import type { Component, ComponentProps } from "solid-js";
import { type JSX, splitProps } from "solid-js";
import { twJoin } from "tailwind-merge";
import { Button } from "~/solidJs/shared/ui";

type DefaultSwitcherButtonProps = {
	isSelected: boolean;
	children?: JSX.Element;
	onClick: (...args: any) => void;
} & ComponentProps<"button">;

export const SwitcherButtonItem: Component<DefaultSwitcherButtonProps> = (props) => {
	return (
		<Button
			class={twJoin(
				"w-[150px] justify-center border-none bg-none text-[#9570FC] text-[14px] outline-none hover:bg-[inherit]",
				props.isSelected && "color-white bg-[#9570FC]"
			)}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};
export const SwitcherButtonPremiumItem: Component<DefaultSwitcherButtonProps> = (props) => {
	const [_custom, _native] = splitProps(props, ["class", "isSelected"]);
	return (
		<button
			class={twJoin(
				"flex items-center justify-center gap-2 rounded-full border-none p-1 font-semibold text-gray-800 outline-none",
				props.isSelected &&
					"bg-gradient-to-r bg-size-200 from-violet-500 via-fuchsia-400 to-violet-500 text-white"
			)}
			{...props}
		>
			{props.children}
		</button>
	);
};
