import {
	type Component,
	type ComponentProps,
	children,
	type JSXElement,
	onMount,
	Show,
	splitProps
} from "solid-js";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import type { moleculesElementsSizes } from "~/solidJs/shared/helpers/types/MoleculesElementsSizes";

type inputVariants = VariantProps<typeof inputStyles>["color"];
type InputOwnProps = {
	isFirefox?: boolean;
	size?: moleculesElementsSizes;
	className?: string;
	variant?: inputVariants;
	disabled?: boolean;
};
export const inputStyles = tv({
	base: "h-max w-full rounded-md border border-solid text-current placeholder-text-text-secondary transition-opacity placeholder:font-medium focus:placeholder-opacity-0 focus:outline-none",
	defaultVariants: {
		color: "default",
		size: "small"
	},
	variants: {
		color: {
			default: "border-gray-300 bg-white",
			trainPageVariant: "border border-gray-300 bg-gray-800 text-white",
			outline:
				"rounded-lg border border-border-gray-dark bg-transparent placeholder:text-text-secondary",
			dropDownBtn:
				"h-max w-max border border-gray-300 border-transparent bg-transparent p-2 text-white",
			Gray: "border-none bg-background-gray-light text-text-primary ring-[1px] ring-border-tertiary placeholder:text-text-secondary focus:ring-[2px] focus:ring-background-violet"
		},
		size: {
			small: "px-4 py-2 font-medium text-2xs",
			medium: "typography-text-14-medium rounded-lg px-4 py-3",
			large: "rounded-xl px-6 py-4 font-medium text-2xs"
		},
		disabled: {
			true: "pointer-events-none opacity-50"
		}
	},
	compoundVariants: [{ color: "Gray", size: "medium", class: "p-3" }]
});
export type InputProps = InputOwnProps & Omit<ComponentProps<"input">, keyof InputOwnProps>;

export const Input: Component<InputProps> = (props) => {
	const [notNativeAttributes, others] = splitProps(props, [
		"class",
		"className",
		"size",
		"variant",
		"disabled",
		"ref"
	]);

	let inputRef: HTMLInputElement;

	onMount(() => {
		inputRef.addEventListener("keydown", (e) => e.stopPropagation());

		if (typeof notNativeAttributes.ref === "function") {
			notNativeAttributes.ref(inputRef);
		}
	});

	return (
		<input
			class={inputStyles({
				size: props.size,
				color: props.variant,
				class: props.class || props.className,
				disabled: props.disabled
			})}
			ref={(ref) => {
				inputRef = ref;
				if (typeof notNativeAttributes.ref === "function") {
					notNativeAttributes.ref(ref);
				}
			}}
			disabled={notNativeAttributes.disabled}
			{...others}
			// firefox fix. only for rename input in workspace list
			{...(props.isFirefox ? { style: { width: "100%" } } : {})}
		/>
	);
};

type InputLabelProps = {
	children: JSXElement;
	id: string;
	labelContent: JSXElement;
	class?: string;
};

export const InputLabel: Component<InputLabelProps> = (props) => {
	return (
		<div class={twMerge("flex w-full flex-col gap-2", props.class)}>
			<label for={props.id} class="typography-text-14-medium text-text-secondary-v2">
				{props.labelContent}
			</label>
			{props.children}
		</div>
	);
};

type InputErrorProps = {
	children: JSXElement;
	id: string;
	labelContent?: JSXElement;
	errorMessage?: string;
	class?: string;
};

export const InputLabelError: Component<InputErrorProps> = (props) => {
	const resolvedLabel = children(() => props.labelContent);
	return (
		<div class={twMerge("flex w-full flex-col gap-2", props.class)}>
			<Show when={resolvedLabel()}>
				<label for={props.id} class="typography-text-14-medium text-text-secondary-v2">
					{resolvedLabel()}
				</label>
			</Show>
			<div class="flex w-full flex-col gap-0.5">
				{props.children}
				<Show when={props.errorMessage}>
					<span class="label-10-medium text-background-orange">{props.errorMessage}</span>
				</Show>
			</div>
		</div>
	);
};
