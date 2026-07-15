import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";
import { tv, type VariantProps } from "tailwind-variants";
import type { ElementType } from "~/solidJs/shared/helpers/types/IElemntTypeEnum";

export type btnVariants = VariantProps<typeof buttonStyles>["color"];
export type btnSizes = VariantProps<typeof buttonStyles>["size"];
export type ButtonExtraBoldVariants = VariantProps<typeof buttonExtaBoldStyles>["color"];

type ButtonCustomPropsBase<E extends ElementType> = {
	children?: JSX.Element;
	pending?: boolean;
	disabled?: boolean;
	className?: string;
	class?: string;
	component?: E;
};

type ButtonMainCustomProps<E extends ElementType> = {
	variant?: btnVariants;
	size?: btnSizes;
} & ButtonCustomPropsBase<E>;

type ButtonExtraBoldCustomProps<E extends ElementType> = {
	variant?: ButtonExtraBoldVariants;
} & ButtonCustomPropsBase<E>;

export type ButtonMainProps<E extends ElementType> = ButtonMainCustomProps<E> &
	Omit<DynamicProps<E>, keyof ButtonMainCustomProps<E>>;

export type ButtonExtraBoldProps<E extends ElementType> = ButtonExtraBoldCustomProps<E> &
	Omit<ComponentProps<E>, keyof ButtonExtraBoldCustomProps<E>>;

export const buttonStyles = tv(
	{
		base: "pointer relative inline-flex items-center justify-center gap-1 rounded-lg border-0 border-transparent font-normal text-2xs outline-none transition-colors focus:outline-none",
		defaultVariants: {
			size: "small",
			color: "basic"
		},
		variants: {
			size: {
				small: "px-3 py-2 font-medium text-xs leading-4",
				medium: "px-3 py-2.5 text-sm",
				large: "rounded-md px-7 py-3 font-medium text-sm leading-4"
			},
			color: {
				actionviolent:
					"bg-interaction-violet text-white transition-all hover:bg-interaction-violet-light-hv hover:bg-purple-500 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
				basic: "text-gray-500 transition-all hover:bg-gray-400 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300",
				premium:
					"hover:-pos-200 bg-gradient-to-r bg-size-200 from-violet-500 via-fuchsia-400 to-violet-500 text-white transition-all duration-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
				hoverMenu:
					"flex-col bg-background-gray text-text-primary transition-all hover:bg-[#E8EAEE] focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:text-gray-500 dark:focus:ring-offset-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 [&>svg]:h-4",
				premiumOutline:
					"rounded-full bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent",
				outline: "border-1 border-background-black text-text0primary hover:bg-gray-200",
				dark: "bg-[#2D2D2D] text-white",
				opacity: "bg-transparent text-white opacity-60 hover:opacity-100",
				headerButton:
					"bg-transparent text-[#F8F9FB] opacity-60 hover:bg-transparent hover:opacity-100",
				iconContainer:
					"166, 166, 1)] 45, 50, 1)] hover:bg-[#F1F1F1] [&_path]:stroke-[rgba(166, hover:[&_path]:stroke-[rgba(41,",
				plain: "",
				TertiaryAccent: "bg-white text-text-primary hover:bg-interaction-white-hv",
				TertiaryNeutral:
					"bg-white text-text-secondary hover:bg-[#F3F4F6] hover:text-text-secondary-v2",
				TertiaryOverlay:
					"bg-interaction-grey-light text-text-primary hover:bg-interaction-grey-light-hv",
				SecondaryAccent: "bg-background-black text-white",
				SecondaryNeutral:
					"bg-interaction-violet-light text-interaction-violet hover:bg-interaction-violet-light-hv",
				TertiaryNeutralIcon:
					"rounded-full bg-white p-2 text-text-secondary-v2 hover:bg-interaction-white-hv",
				SecondaryOverlay:
					"bg-interaction-grey-light text-interaction-violet hover:bg-interaction-grey-light-hv",
				PrimaryAccent:
					"rounded-md bg-interaction-violet text-white hover:bg-interaction-violet-hv",
				PrimaryIcon:
					"rounded-1.5 bg-transparent text-text-secondary-v2 hover:bg-interaction-grey-light-hv",
				DangerOverlay:
					"bg-status-error text-status-accent-error hover:bg-status-accent-error hover:text-status-error",
				ButtonPremium:
					"!typography-text-14-medium flex h-[55px] items-center justify-center gap-1.5 rounded-full bg-interaction-gradient px-7 py-3 text-white",
				ButtonFooter: "h-10 rounded-lg bg-white p-3 hover:bg-background-content-tertiary",
				FlexButtonSecondary:
					"typography-text-14-medium rounded-sm bg-white p-0 text-interaction-black hover:text-interaction-black-hv",
				FlexButtonPrimary:
					"typography-text-14-medium rounded-sm bg-white p-0 text-interaction-violet hover:text-interaction-violet-hv",
				AccentIcon:
					"rounded-full bg-[rgb(255,255,255)]/80 p-2 hover:bg-interaction-grey-light",
				OverlayIcon:
					"rounded-full bg-[rgb(255,255,255)]/17 p-1 hover:bg-[rgb(255,255,255)]/25",
				SecondaryNeutralIcon:
					"rounded-full border border-border-secondary bg-white text-text-secondary-v2 hover:bg-interaction-white-hv",
				Ghost: "text-white hover:bg-background-overlay-black-20 hover:backdrop-blur-md",
				ButtonNode:
					"label-10-medium gap-1.5 rounded-full bg-background-interaction-tertiary px-2.5 py-1 text-text-primary hover:bg-background-interaction-tertiary-hv"
			},
			disabled: {
				true: "pointer-events-none opacity-50"
			},
			pending: {
				true: "pointer-events-none size-1000 animate-shimmer bg-gradient-to-r from-[#3b3b3b] via-[#6e6e6e] to-[#3b3b3b] text-[#adadad]"
			}
		},
		compoundVariants: [
			{
				color: "TertiaryAccent",
				disabled: true,
				class: "text-text-tertiary opacity-100"
			},
			{ color: "Ghost", size: "small", class: "label-10-medium gap-1.5 rounded-md p-1.5" },
			{
				color: "SecondaryNeutralIcon",
				size: "medium",
				class: "p-2"
			},
			{
				color: "ButtonNode",
				size: "small",
				class: "px-2.5 py-1.5"
			},
			{
				color: "TertiaryOverlay",
				size: "small",
				class: "!caption-12-medium"
			},
			{
				color: "PrimaryIcon",
				size: "large",
				class: "p-1"
			},
			{
				color: "SecondaryOverlay",
				disabled: true,
				class: "bg-[#E8EAEE] text-text-secondary"
			},
			{
				color: "SecondaryNeutral",
				disabled: true,
				class: "bg-interaction-violet-light-hv text-text-secondary opacity-100"
			}
		]
	},
	{ twMerge: true }
);

const defaultElement = "button";

export const Button = <E extends ElementType = typeof defaultElement>(
	props: ButtonMainProps<E>
) => {
	const [notNativeAttributes, others] = splitProps(
		props as DynamicProps<E> & ButtonMainCustomProps<E>,
		[
			"className",
			"class",
			"disabled",
			"component",
			"children",
			"variant",
			"pending",
			"size",
			"ref"
		]
	);
	const Element = notNativeAttributes.component || defaultElement;

	return (
		<Dynamic
			type={"button"}
			component={Element}
			class={buttonStyles({
				color: props.variant,
				size: props.size,
				pending: notNativeAttributes.pending,
				disabled: props.disabled,
				class: props.class || props.className
			})}
			ref={props.ref}
			{...(others as any)}
		>
			{notNativeAttributes.children}
		</Dynamic>
	);
};

const buttonExtaBoldStyles = tv({
	base: "typography-text-17-medium flex items-center justify-center rounded-xl border-none px-7 py-5 outline-none",
	defaultVariants: {
		color: "Primary"
	},

	variants: {
		color: {
			Primary: "bg-interaction-violet text-white hover:bg-interaction-violet-hv",
			Secondary: "bg-interaction-black text-white hover:bg-interaction-black-hv",
			Tertiary:
				"-outline-offset-1 bg-transparent text-text-primary outline-[1.5px] outline-interaction-black hover:bg-interaction-white-hv"
		},
		disabled: {
			true: "pointer-events-none bg-background-interaction-tertiary text-text-secondary"
		}
	}
});

export const ButtonExtraBold = <E extends ElementType = typeof defaultElement>(
	props: ButtonExtraBoldProps<E>
) => {
	const [notNativeAttributes, others] = splitProps(props, [
		"className",
		"class",
		"component",
		"children",
		"variant",
		"pending"
	]);

	const Element = notNativeAttributes.component || defaultElement;

	return (
		<Dynamic
			type={"button"}
			component={Element}
			class={buttonExtaBoldStyles({
				color: props.variant,
				disabled: props.disabled,
				class: props.class || props.className
			})}
			disabled={props.disabled}
			{...(others as any)}
		>
			{notNativeAttributes.children}
		</Dynamic>
	);
};
