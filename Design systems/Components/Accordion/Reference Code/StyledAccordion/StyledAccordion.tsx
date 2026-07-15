import { Accordion, type Assign, type HTMLProps } from "@ark-ui/solid";
import type { ComponentProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import { createStyleContext } from "~/solidJs/shared/helpers/create-style-context";

const accordion = tv(
	{
		base: "accordion",
		defaultVariants: { size: "md" },
		slots: {
			root: "flex w-full flex-col gap-2",
			item: "rounded-md bg-white p-4",
			itemTrigger:
				"typography-text-16-medium flex justify-between gap-3 rounded-none border-0 border-border-secondary border-t border-solid bg-transparent p-0 py-4 text-text-primary",
			itemContent: "typography-text-16-medium pb-4 text-text-secondary",
			itemIndicator: ""
		},
		variants: {
			size: {
				md: {
					root: "",
					item: "",
					itemTrigger: "",
					itemContent: "",
					itemIndicator: ""
				}
			}
		}
	},
	{ twMerge: true }
);

const { withProvider, withContext, withRootProvider } = createStyleContext(accordion);
export type AccordionVariantProps = VariantProps<typeof accordion>;
export type RootProviderProps = ComponentProps<typeof RootProvider>;
export const RootProvider = withRootProvider<
	Assign<Assign<HTMLProps<"div">, Accordion.RootProviderBaseProps>, AccordionVariantProps>
>(Accordion.RootProvider);

export type RootProps = ComponentProps<typeof Root>;
export const Root = withProvider<
	Assign<Assign<HTMLProps<"div">, Accordion.RootBaseProps>, AccordionVariantProps>
>(Accordion.Root, "root");

export const ItemContent = withContext<Assign<HTMLProps<"div">, Accordion.ItemContentBaseProps>>(
	Accordion.ItemContent,
	"itemContent"
);

export const ItemIndicator = withContext<
	Assign<HTMLProps<"div">, Accordion.ItemIndicatorBaseProps>
>(Accordion.ItemIndicator, "itemIndicator");

export const Item = withContext<Assign<HTMLProps<"div">, Accordion.ItemBaseProps>>(
	Accordion.Item,
	"item"
);

export const ItemTrigger = withContext<Assign<HTMLProps<"button">, Accordion.ItemTriggerBaseProps>>(
	Accordion.ItemTrigger,
	"itemTrigger"
);

export type {
	AccordionFocusChangeDetails as FocusChangeDetails,
	AccordionValueChangeDetails as ValueChangeDetails
} from "@ark-ui/solid";
export { AccordionContext as Context, AccordionItemContext as ItemContext } from "@ark-ui/solid";
