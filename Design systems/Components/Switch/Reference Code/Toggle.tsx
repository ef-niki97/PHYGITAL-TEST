import { Switch as ArkSwitch, type SwitchRootProps } from "@ark-ui/solid";
import type { Component } from "solid-js";
import { type ComponentProps, children, Show, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import classes from "./Toggle.module.scss";

export interface SwitchProps extends SwitchRootProps, SwitchVariantProps {
	inputProps?: ComponentProps<"input"> & { "data-test"?: string };
}

export const Switch = (props: SwitchProps) => {
	const [variantProps, switchProps] = splitProps(props, ["size", "colorStyle", "class"]);
	const [localProps, rootProps] = splitProps(switchProps, ["children", "inputProps"]);
	const getChildren = children(() => localProps.children);
	const { root, control, label, thumb } = styles(variantProps);

	return (
		<ArkSwitch.Root class={root({ class: props.class })} {...rootProps}>
			<Show when={getChildren()}>
				<ArkSwitch.Label class={label()}>{getChildren()}</ArkSwitch.Label>
			</Show>
			<ArkSwitch.Control class={control()}>
				<ArkSwitch.Thumb class={thumb()} />
			</ArkSwitch.Control>
			<ArkSwitch.HiddenInput {...props.inputProps} />
		</ArkSwitch.Root>
	);
};

type SwitchVariantProps = VariantProps<typeof styles>;

const styles = tv(
	{
		base: "switchRecipe",
		defaultVariants: { size: "md", colorStyle: "green" },
		slots: {
			root: "items-center gap-2",
			label: "switchRecipe__label",
			control: "inline-flex cursor-pointer items-center rounded-full bg-black",
			thumb: "rounded-full bg-white transition-transform duration-200 data-[state=checked]:translate-x-full"
		},
		variants: {
			colorStyle: {
				purple: {
					control:
						"bg-interaction-grey-light hover:bg-interaction-grey-light-hv data-[state=checked]:bg-interaction-violet data-[state=checked]:hover:bg-interaction-violet-hv"
				},
				green: {
					control: "bg-gray-400 data-[state=checked]:bg-green-500"
				}
			},
			size: {
				sm: {
					control: "w-6 p-px",
					thumb: "size-3"
				},
				md: {
					control: "w-11 p-0.5",
					thumb: "size-5 data-[state=checked]:translate-x-full data-[state=unchecked]:outline data-[state=unchecked]:outline-1 data-[state=unchecked]:outline-border-secondary"
				},
				lg: {
					control: "w-6",
					thumb: "size-3"
				}
			}
		}
	},
	{ twMerge: true }
);

type ToggleProps = {} & ComponentProps<"input">;

export const Toggle: Component<ToggleProps> = (props) => {
	const [_notNativeAttributes, others] = splitProps(props, ["children", "type"]);

	return (
		<div>
			<input
				type={"checkbox"}
				id={props.id || "defaultToggleId"}
				class={classes.input}
				data-checked={props.checked}
				hidden
				{...others}
			/>
			<label class={classes.label} for={props.id || "defaultToggleId"}>
				<div class={classes.toggler} />
			</label>
		</div>
	);
};
