import type { Component } from "solid-js";
import { type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv(
	{
		base: "pointer-events-none flex items-center gap-2 rounded-lg font-normal shadow-sm outline-none",
		defaultVariants: {
			color: "default",
			size: "md"
		},
		variants: {
			size: {
				sm: "px-2 py-1 text-xs",
				md: "px-2 py-1 text-xs",
				lg: "px-3 py-1.5 text-xs"
			},
			color: {
				default: "border-none bg-[#F8F9FB] text-[#2D2D2D]",
				blur: "rounded-full border border-[#C7C7D1] bg-black bg-opacity-40 text-white backdrop-blur-sm",
				premium:
					"rounded-full border border-[var(--primary-purple-80,#BEA3F5)] bg-gradient-to-r from-[rgba(149,112,252,0.7)] to-[rgba(241,93,254,0.7)] text-white backdrop-blur-sm",
				lightBlur: "rounded-full border border-white/40 bg-white/30 text-white",
				blueGradient:
					"rounded-full border border-[#E6E6E6] bg-gradient-to-r from-[#65B6F0] to-[#7775ED] font-bold text-white",
				grayGradient:
					"rounded-full border border-gray-100 bg-gradient-to-br from-[#C7C7D1] to-[#66666B] font-bold text-white",
				yellowGradient:
					"rounded-full border border-gray-100 bg-gradient-to-br from-yellow-300 to-yellow-500 font-bold text-white"
			}
		}
	},
	{ twMerge: true }
);
type TagCustomProps = {
	variant?: TagVariants;
	size?: TagSizes;
};

type TagProps = TagCustomProps & Omit<ComponentProps<"button">, keyof TagCustomProps>;
type TagVariants = VariantProps<typeof styles>["color"];
type TagSizes = VariantProps<typeof styles>["size"];
export const Tag: Component<TagProps> = (props) => {
	const [_, defaultProps] = splitProps(props, ["class", "children", "variant", "size"]);

	return (
		<button
			class={styles({ color: props.variant, class: props.class, size: props.size })}
			{...defaultProps}
		>
			{props.children}
		</button>
	);
};
