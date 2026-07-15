import { type Assign, type HTMLProps, Toast } from "@ark-ui/solid";
import type { ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const toast = tv(
	{
		base: "toast",
		defaultVariants: { toastType: "default", size: "default" },
		slots: {
			root: "flex w-max max-w-[580px] items-center gap-3 rounded-xl border border-white/5 px-3 py-2 text-white shadow-[0_8px_24px_0_rgba(0,0,0,0.15)]",
			title: "font-medium text-[13px] leading-snug",
			description: "text-xs leading-4",
			closeTrigger: "shrink-0 cursor-pointer text-white transition-opacity hover:opacity-80",
			actionTrigger:
				"h-8 shrink-0 cursor-pointer rounded-md px-3 py-2 text-xs transition-colors"
		},
		variants: {
			toastType: {
				default: {
					root: "bg-[#2E2D2D]"
				},
				error: {
					root: "bg-[#F20D33]"
				},
				success: {
					root: "bg-status-accent-positive"
				},
				warning: {
					root: "bg-background-orange"
				},
				info: {
					root: "bg-[#2E2D2D]"
				}
			},
			size: {
				default: {
					root: "min-h-[48px]"
				},
				compact: {
					root: ""
				}
			}
		}
	},
	{ twMerge: true }
);

const { withRootProvider, withContext } = createStyleContext(toast);

export type ToastVariationProps = VariantProps<typeof toast>;

export type RootProps = ComponentProps<typeof Root>;
export const Root = withRootProvider<Assign<Toast.RootProps, ToastVariationProps>>(Toast.Root);

export const ActionTrigger = withContext<Assign<HTMLProps<"button">, Toast.ActionTriggerBaseProps>>(
	Toast.ActionTrigger,
	"actionTrigger"
);

export const CloseTrigger = withContext<Assign<HTMLProps<"button">, Toast.CloseTriggerBaseProps>>(
	Toast.CloseTrigger,
	"closeTrigger"
);

export const Description = withContext<Assign<HTMLProps<"div">, Toast.DescriptionBaseProps>>(
	Toast.Description,
	"description"
);

export const Title = withContext<Assign<HTMLProps<"div">, Toast.TitleBaseProps>>(
	Toast.Title,
	"title"
);

export { ToastContext as Context } from "@ark-ui/solid";
