import {
	type Assign,
	type HTMLProps,
	NumberInput,
	type NumberInputRootProps,
	useNumberInput
} from "@ark-ui/solid";
import type { Component, ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const styles = tv({
	base: "numberInput",
	defaultVariants: { size: "md", variant: "default" },
	slots: {
		root: "numberInput__root border-none outline-none ring-none",
		label: "numberInput__label",
		input: "bg-background-black text-text-secondary outline-none",
		control: "numberInput__control border-none outline-none ring-none",
		incrementTrigger: "numberInput__incrementTrigger",
		decrementTrigger: "numberInput__decrementTrigger",
		scrubber: "numberInput__scrubber"
	},
	variants: {
		variant: {
			default: {},
			seats: {
				root: "flex w-max items-center rounded-lg bg-background-gray-light p-[9px] outline outline-1 outline-[#DDE1E6]",
				control: "flex items-center gap-4",
				input: "typography-text-14-medium w-7 bg-transparent text-center text-text-primary",
				incrementTrigger:
					"order-2 flex shrink-0 items-center justify-center rounded-full bg-interaction-black p-1 disabled:bg-interaction-grey",
				decrementTrigger:
					"order-0 flex shrink-0 items-center justify-center rounded-full bg-interaction-black p-1 disabled:bg-interaction-grey",
				scrubber:
					"typography-text-14-medium order-1 min-w-[27px] flex-1 text-center text-text-primary"
			}
		},
		size: {
			md: {
				root: "numberInput__root--size_md",
				label: "numberInput__label--size_md",
				input: "numberInput__input--size_md",
				control: "numberInput__control--size_md",
				incrementTrigger: "numberInput__incrementTrigger--size_md",
				decrementTrigger: "numberInput__decrementTrigger--size_md",
				scrubber: "numberInput__scrubber--size_md"
			},
			lg: {
				root: "numberInput__root--size_lg",
				label: "numberInput__label--size_lg",
				input: "numberInput__input--size_lg",
				control: "numberInput__control--size_lg",
				incrementTrigger: "numberInput__incrementTrigger--size_lg",
				decrementTrigger: "numberInput__decrementTrigger--size_lg",
				scrubber: "numberInput__scrubber--size_lg"
			},
			xl: {
				root: "numberInput__root--size_xl",
				label: "numberInput__label--size_xl",
				input: "numberInput__input--size_xl",
				control: "numberInput__control--size_xl",
				incrementTrigger: "numberInput__incrementTrigger--size_xl",
				decrementTrigger: "numberInput__decrementTrigger--size_xl",
				scrubber: "numberInput__scrubber--size_xl"
			}
		}
	}
});
const { withProvider, withContext, withRootProvider } = createStyleContext(styles);
export type NumberInputVariantProps = VariantProps<typeof styles>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<Assign<HTMLProps<"div">, NumberInput.RootProviderProps>, NumberInputVariantProps>
>(NumberInput.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, NumberInput.RootProps>, NumberInputVariantProps>
>(NumberInput.Root, "root");

export const Control = withContext<Assign<HTMLProps<"div">, NumberInput.ControlBaseProps>>(
	NumberInput.Control,
	"control"
);

export const DecrementTrigger = withContext<
	Assign<HTMLProps<"button">, NumberInput.DecrementTriggerBaseProps>
>(NumberInput.DecrementTrigger, "decrementTrigger");

export const IncrementTrigger = withContext<
	Assign<HTMLProps<"button">, NumberInput.IncrementTriggerBaseProps>
>(NumberInput.IncrementTrigger, "incrementTrigger");

export const Input = withContext<Assign<HTMLProps<"input">, NumberInput.InputBaseProps>>(
	NumberInput.Input,
	"input"
);

export const Label = withContext<Assign<HTMLProps<"label">, NumberInput.LabelBaseProps>>(
	NumberInput.Label,
	"label"
);

export const Scrubber = withContext<Assign<HTMLProps<"div">, NumberInput.ScrubberBaseProps>>(
	NumberInput.Scrubber,
	"scrubber"
);

export const ValueText = withContext<Assign<HTMLProps<"span">, NumberInput.ValueTextProps>>(
	NumberInput.ValueText,
	"scrubber"
);

export { NumberInputContext as Context } from "@ark-ui/solid";

/**
 * Seats-style Number Input Component
 * Closed component with increment/decrement buttons for easy usage
 */
export interface NumberInputClosedProps {
	rootProps?: NumberInputRootProps;
	variant?: "default" | "seats";
	onIncrement?: () => void;
	onDecrement?: () => void;
}

export const NumberInputClosed: Component<NumberInputClosedProps> = (props) => {
	const state = useNumberInput(() => ({ ...props.rootProps }));
	return (
		<RootProvider value={state} variant={props.variant || "default"}>
			<Control>
				<DecrementTrigger
					onClick={props.onDecrement}
					data-test="number-input-decrement-btn"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 8H4"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</DecrementTrigger>
				<Input data-test="number-input-input" />
				<IncrementTrigger
					onClick={props.onIncrement}
					data-test="number-input-increment-btn"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 4V12M4 8H12"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</IncrementTrigger>
			</Control>
		</RootProvider>
	);
};
