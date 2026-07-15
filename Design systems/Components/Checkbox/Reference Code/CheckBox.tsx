import type { Assign, HTMLProps } from "@ark-ui/solid";
import { Checkbox as ArkCheckBox } from "@ark-ui/solid";
import { Check, Minus } from "lucide-solid";
import type { Component, ParentComponent } from "solid-js";
import { type ComponentProps, splitProps } from "solid-js";
import { twJoin } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";
import classes from "./CheckBox.module.scss";

const styles = tv({
	base: "",
	defaultVariants: { size: "md" },
	slots: {
		root: "flex items-center gap-2",
		label: "typography-text-14-medium text-text-secondary-v2",
		control: twJoin(
			"-outline-offset-2 text-white outline outline-2 outline-border-tertiary hover:outline-border-gray-dark",
			"cursor-pointer data-[state=checked]:bg-interaction-violet data-[state=checked]:outline-none",
			"data-[state=checked]:hover:bg-interaction-violet-hv"
		),
		indicator: "flex size-full items-center justify-center"
	},
	variants: {
		color: {},
		size: {
			md: {
				root: "",
				label: "",
				control: "size-5 rounded-md",
				indicator: ""
			}
		},
		disabled: {
			true: {
				root: "pointer-events-none",
				label: "",
				indicator: "",
				control: "pointer-events-none opacity-40"
			}
		}
	}
});
const { withProvider, withContext, withRootProvider } = createStyleContext(styles);

export type ArkCheckBoxVariantProps = VariantProps<typeof styles>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;

export const RootProvider = withRootProvider<
	Assign<Assign<HTMLProps<"div">, ArkCheckBox.RootProviderProps>, ArkCheckBoxVariantProps>
>(ArkCheckBox.RootProvider);

export type RootProps = ComponentProps<typeof Root>;

export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, ArkCheckBox.RootProps>, ArkCheckBoxVariantProps>
>(ArkCheckBox.Root, "root");

export const Control = withContext<Assign<HTMLProps<"div">, ArkCheckBox.ControlBaseProps>>(
	ArkCheckBox.Control,
	"control"
);

export const Indicator = withContext<Assign<HTMLProps<"label">, ArkCheckBox.IndicatorBaseProps>>(
	ArkCheckBox.Indicator,
	"indicator"
);

export const Label = withContext<Assign<HTMLProps<"label">, ArkCheckBox.LabelBaseProps>>(
	ArkCheckBox.Label,
	"label"
);

export const ArkClosedCheckBox: ParentComponent<RootProps> = (props) => {
	const [_, base] = splitProps(props, ["children"]);
	return (
		<Root {...base}>
			<Control>
				<Indicator>
					<Check size={16} />
				</Indicator>
				<Indicator indeterminate>
					<Minus class="text-text-secondary" size={16} />
				</Indicator>
			</Control>
			<Label>{props.children}</Label>
			{/*not setting hidden attr will cause anchor scroll bugs in chrome, causing page html and body incorrect position*/}
			<ArkCheckBox.HiddenInput hidden />
		</Root>
	);
};

type CheckBoxProps = {} & ComponentProps<"input">;

export const CheckBox: Component<CheckBoxProps> = (props) => {
	const [_notNativeAttributes, others] = splitProps(props, ["children", "type", "class"]);
	const getId = () => props.id || "defaultId";
	return (
		<>
			<input type={"checkbox"} id={getId()} class={classes.input} hidden {...others} />
			<label class={twJoin(classes.label, props.class)} for={getId()}>
				{props.children}
			</label>
		</>
	);
};
