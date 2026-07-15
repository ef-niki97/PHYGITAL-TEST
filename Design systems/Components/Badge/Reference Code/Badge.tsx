import { type Component, type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";

export type BadgeVariants = VariantProps<typeof badgeStyles>["variant"];
export type BadgeSizes = VariantProps<typeof badgeStyles>["size"];

type BadgeCustomProps = {
	variant?: BadgeVariants;
	size?: BadgeSizes;
	className?: string;
	class?: string;
};

export const badgeStyles = tv(
	{
		base: "inline-flex w-fit items-center",
		defaultVariants: {
			size: "medium",
			variant: "default"
		},
		variants: {
			size: {
				small: "px-1 py-0.5",
				medium: "px-2 py-1.5"
			},
			variant: {
				default: "rounded-md bg-background-black text-background-white",
				warning: "rounded-md bg-background-orange text-interaction-white",
				accent: "rounded-md bg-background-violet text-interaction-white",
				outline:
					"label-10-medium rounded-full border border-interaction-violet px-2.5 py-1.5 text-interaction-violet",
				credits: "gap-0.5 rounded bg-interaction-grey-light-hv text-text-secondary",
				creditsDark: "gap-0.5 rounded bg-[#4D4D4D] text-white",
				creditsOrange: "gap-0.5 rounded bg-[rgb(242,120,7)]/20 text-background-orange"
			}
		},
		compoundVariants: [
			{
				variant: "credits",
				size: "small",
				class: "caption-9-medium"
			},
			{
				variant: "creditsDark",
				size: "small",
				class: "caption-9-medium"
			},
			{
				variant: "creditsOrange",
				size: "small",
				class: "caption-9-medium"
			},
			{
				variant: "credits",
				size: "medium",
				class: "caption-13-medium gap-1 px-1.5 py-1 leading-3"
			},
			{
				variant: "creditsDark",
				size: "medium",
				class: "caption-13-medium gap-1 px-1.5 py-1 leading-3"
			},
			{
				variant: "creditsOrange",
				size: "medium",
				class: "caption-13-medium gap-1 px-1.5 py-1 leading-3"
			},
			{
				variant: "default",
				size: "medium",
				class: "caption-11-medium rounded-md bg-background-black text-interaction-white leading-[10px]"
			},
			{
				variant: "default",
				size: "small",
				class: "label-9-mono rounded bg-background-gray-light text-text-secondary"
			},
			{
				variant: "warning",
				size: "medium",
				class: "caption-11-medium rounded-full bg-background-orange text-interaction-white"
			},
			{
				variant: "warning",
				size: "small",
				class: "label-9-mono rounded bg-background-orange text-interaction-white"
			},
			{
				variant: "accent",
				size: "medium",
				class: "caption-11-medium rounded-md bg-background-violet text-interaction-white"
			},
			{
				variant: "accent",
				size: "small",
				class: "label-10-regular rounded bg-background-violet text-interaction-white"
			}
		]
	},
	{ twMerge: true }
);

export type BadgeProps = BadgeCustomProps & Omit<ComponentProps<"div">, keyof BadgeCustomProps>;

export const Badge: Component<BadgeProps> = (props) => {
	const [local, others] = splitProps(props, [
		"variant",
		"size",
		"children",
		"class",
		"className"
	]);

	return (
		<div
			class={badgeStyles({
				variant: local.variant,
				size: local.size,
				class: local.class || local.className
			})}
			{...others}
		>
			{local.children}
		</div>
	);
};
