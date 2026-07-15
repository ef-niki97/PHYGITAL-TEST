import { ChevronDown } from "lucide-solid";
import { type Component, type JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const textLinkBase =
	"font-sans caption-12-medium inline-flex w-fit cursor-pointer items-center gap-[4px] overflow-visible bg-transparent p-0 text-text-secondary-v2 transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interaction-violet focus-visible:ring-offset-0";

const textLinkLabel = "underline decoration-dotted underline-offset-[16%] decoration-[12.5%]";

const textLinkDisabled =
	"pointer-events-none cursor-not-allowed text-text-tertiary hover:text-text-tertiary focus-visible:ring-0";

export interface TextLinkProps
	extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children" | "style"> {
	text: string;
	class?: string;
	style?: JSX.CSSProperties;
	disabled?: boolean;
	chevronUp?: boolean;
	chevronClass?: string;
}

export const TextLink: Component<TextLinkProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"text",
		"class",
		"style",
		"disabled",
		"role",
		"tabIndex",
		"chevronUp",
		"chevronClass"
	]);

	return (
		<div
			class={twMerge(textLinkBase, local.disabled && textLinkDisabled, local.class)}
			style={local.style}
			aria-disabled={local.disabled && "true"}
			tabIndex={local.disabled ? -1 : local.tabIndex}
			{...rest}
		>
			<span class={textLinkLabel} style={{ "text-decoration-skip-ink": "none" }}>
				{local.text}
			</span>
			<span class="inline-flex size-4 shrink-0 items-center justify-center overflow-visible">
				<ChevronDown
					size={16}
					class={twMerge(
						"shrink-0 text-current transition-transform duration-200",
						local.chevronUp && "rotate-180",
						local.chevronClass
					)}
					aria-hidden={true}
				/>
			</span>
		</div>
	);
};
