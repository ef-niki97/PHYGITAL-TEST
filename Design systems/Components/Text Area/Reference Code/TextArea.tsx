import { type Component, type ComponentProps, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const TextArea: Component<ComponentProps<"textarea">> = (props) => {
	const [notNativeAttributes, rest] = splitProps(props, ["class"]);
	return (
		<textarea
			class={twMerge(
				"styledScrollBar typography-text-14-medium h-max rounded-xl p-4 pr-2 text-text-primary outline outline-1 outline-border-tertiary placeholder:text-text-secondary hover:outline-border-gray-dark",
				"hover:placeholder:text-text-secondary-v2",
				"focus:outline-interaction-violet",
				notNativeAttributes.class
			)}
			{...rest}
		/>
	);
};
