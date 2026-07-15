import type { Assign } from "@ark-ui/solid";
import { Tooltip as ArkTooltip, type HTMLProps } from "@ark-ui/solid";
import { type Component, type ComponentProps, type JSX, type JSXElement, Show } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { tv, type VariantProps } from "tailwind-variants";
import ArrowTipIcon from "~/Icons/Icon_ArrowTip.svg?component-solid";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";
import classes from "./Tooltip.module.scss";

const tooltip = tv(
	{
		slots: {
			trigger: "",
			indicator: "menu__indicator",
			positioner: "z-[999]",
			arrow: "menu__arrow",
			arrowTip: "menu__arrowTip text-[#2D2D2E]",
			content:
				"z-[999] flex max-h-96 flex-col overflow-auto rounded-[6px] bg-[#2D2D2E] px-[8px] py-[6px] font-medium text-[11px] text-white leading-[91%] shadow-lg outline-none"
		},
		variants: {}
	},
	{ twMerge: true }
);

const { withRootProvider, withContext } = createStyleContext(tooltip);

export type TooltipVariationProps = VariantProps<typeof tooltip>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<ArkTooltip.RootProviderProps, TooltipVariationProps>
>(ArkTooltip.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<Assign<ArkTooltip.RootProps, TooltipVariationProps>>(
	ArkTooltip.Root
);

export const Arrow = withContext<Assign<HTMLProps<"div">, ArkTooltip.ArrowBaseProps>>(
	ArkTooltip.Arrow,
	"arrow"
);

export const ArrowTip = withContext<Assign<HTMLProps<"div">, ArkTooltip.ArrowTipBaseProps>>(
	ArkTooltip.ArrowTip,
	"arrowTip"
);

export const Content = withContext<Assign<HTMLProps<"div">, ArkTooltip.ContentBaseProps>>(
	ArkTooltip.Content,
	"content"
);

export const Positioner = withContext<Assign<HTMLProps<"div">, ArkTooltip.PositionerBaseProps>>(
	ArkTooltip.Positioner,
	"positioner"
);

export const Trigger = withContext<Assign<HTMLProps<"button">, ArkTooltip.TriggerBaseProps>>(
	ArkTooltip.Trigger,
	"trigger"
);

export { TooltipContext as Context } from "@ark-ui/solid";

export interface TooltipClosedComponentProps {
	children?: Component<ComponentProps<"button">>;
	asContent?: Component<ComponentProps<"div">>;
	content?: JSXElement;
	rootProps?: ArkTooltip.RootProps;
	showArrow?: boolean;
	portaled?: boolean;
	portalMount?: () => Element;
}

export const TooltipClosedComponent: Component<TooltipClosedComponentProps> = (props) => {
	return (
		<Root
			closeDelay={0}
			openDelay={0}
			positioning={{
				placement: "top",
				...(props?.rootProps?.positioning ? props.rootProps?.positioning : {}),
				arrowPadding: 50
			}}
			lazyMount
			unmountOnExit
			{...props.rootProps}
		>
			<Trigger asChild={(asProps) => <Dynamic component={props.children} {...asProps()} />} />
			<Show
				fallback={
					<Positioner style={{ "--z-index": "1000", "z-index": "999" }}>
						<Show when={props.showArrow}>
							<ArkTooltip.Arrow
								style={{
									"--arrow-offset-shifter": "calc(var(--arrow-size-half) - 2px)",
									"--arrow-offset": "calc(var(--arrow-offset-shifter) * -1)"
								}}
							>
								<ArrowTip>
									<ArrowTipIcon class="size-[var(--arrow-size)] rotate-[315deg]" />
								</ArrowTip>
							</ArkTooltip.Arrow>
						</Show>
						<Show when={props.asContent}>
							<Content
								asChild={(p) => (
									<Dynamic
										component={props.asContent}
										{...p()}
										class={"z-[999]"}
									/>
								)}
							>
								{props.content}
							</Content>
						</Show>
						<Show when={!props.asContent}>
							<Content>{props.content}</Content>
						</Show>
					</Positioner>
				}
				when={props.portaled !== false}
			>
				<Portal mount={props.portalMount?.()}>
					<Positioner style={{ "--z-index": "1000", "z-index": "999" }}>
						<Show when={props.showArrow}>
							<ArkTooltip.Arrow
								style={{
									"--arrow-offset-shifter": "calc(var(--arrow-size-half) - 2px)",
									"--arrow-offset": "calc(var(--arrow-offset-shifter) * -1)"
								}}
							>
								<ArrowTip>
									<ArrowTipIcon class="size-[var(--arrow-size)] rotate-[315deg]" />
								</ArrowTip>
							</ArkTooltip.Arrow>
						</Show>
						<Show when={props.asContent}>
							<Content
								asChild={(p) => (
									<Dynamic
										component={props.asContent}
										{...p()}
										class={"z-[999]"}
									/>
								)}
							>
								{props.content}
							</Content>
						</Show>
						<Show when={!props.asContent}>
							<Content>{props.content}</Content>
						</Show>
					</Positioner>
				</Portal>
			</Show>
		</Root>
	);
};

type TooltipProps = {
	children: JSX.Element;
	className?: string;
};

export const Tooltip: Component<TooltipProps> = (props) => {
	return <div class={`${classes.tooltip} ${props.className || ""}`}>{props.children}</div>;
};
