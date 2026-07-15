import type { Component, ComponentProps } from "solid-js";
import { type JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { CustomImage } from "~/solidJs/shared/ui";

type SwitcherImageCustomItemProps = {
	isSelected: boolean;
	children?: JSX.Element;
	childrenComponent?: boolean;
	imageSrc: string;
	onClick: (...args: any) => void;
};
type SwitcherImageItemProps = SwitcherImageCustomItemProps &
	Omit<ComponentProps<"li">, keyof SwitcherImageCustomItemProps>;

export const SwitcherImageItem: Component<SwitcherImageItemProps> = (props) => {
	const [_other, nativeProps] = splitProps(props, [
		"children",
		"class",
		"isSelected",
		"childrenComponent",
		"imageSrc"
	]);

	return (
		<li
			class={twMerge(
				"relative h-[calc(100%-4px)] w-[calc(25%-10px)] min-w-max flex-grow cursor-pointer list-none rounded-lg border-2 border-transparent opacity-40",
				props.isSelected && "bg-image-gradient opacity-1",
				props.class
			)}
			{...nativeProps}
		>
			<CustomImage src={props.imageSrc} class={"h-full w-full"} />
			{props.childrenComponent ? (
				props.children
			) : (
				<span
					class={
						"-translate-x-1/2 absolute bottom-0 left-1/2 mb-2 transform whitespace-nowrap"
					}
				>
					{props.children}
				</span>
			)}
		</li>
	);
};
