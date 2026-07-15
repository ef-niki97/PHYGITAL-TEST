import { type Component, type ComponentProps, splitProps } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants";
import GptIcon from "~/Icons/32_Icon_GPT.svg?component-solid";
import { getUserStore } from "~/solidJs/entities/HeaderMain/models";
import { getAvatarLetter } from "~/solidJs/shared/helpers";
import { Button } from "../Button/Button";

type AvatarProps = {
	size?: VariantProps<typeof avatarClasses>["size"];
} & ComponentProps<"button">;
export const GptAvatar: Component<AvatarProps> = (_props) => {
	return (
		<div class="rounded-full border border-border-secondary">
			<GptIcon />
		</div>
	);
};

export const UserAvatar: Component<AvatarProps> = (props) => {
	return (
		<Avatar {...props}>
			<div class="flex size-5 items-center justify-center text-15-semibold text-text-primary">
				{getAvatarLetter(getUserStore())}
			</div>
		</Avatar>
	);
};

const avatarClasses = tv({
	base: "items-center justify-center bg-background-interaction-tertiary hover:bg-background-interaction-tertiary",
	defaultVariants: {
		size: "md"
	},
	variants: {
		size: {
			md: "size-10 rounded-[10px] p-2.5",
			lg: "rounded-2xl p-3"
		}
	}
});

export const Avatar: Component<AvatarProps> = (props) => {
	const [_custom, native] = splitProps(props, ["class", "children", "size"]);
	return (
		<Button class={avatarClasses({ size: props.size, class: props.class })} {...native}>
			{props.children}
		</Button>
	);
};
