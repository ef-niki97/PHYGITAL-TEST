import { HoverCard, type UseHoverCardProps, useHoverCard } from "@ark-ui/solid";
import type { Component, JSXElement } from "solid-js";
import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { twMerge } from "tailwind-merge";

type DropDownProps = {
	children: JSXElement;
	btnContent: JSXElement;
	btnClass?: string;
	isNeedToHiderArrow?: boolean;
	testAttr?: string;
	containerClass?: string;
	options?: UseHoverCardProps;
};

export const DropDown: Component<DropDownProps> = (props) => {
	let elContainerRef: HTMLDivElement;
	const api = useHoverCard({
		positioning: {
			offset: {
				mainAxis: 5
			},
			placement: "bottom-end"
		},
		openDelay: 0,
		closeDelay: 100,
		...(props.options ? props.options : {})
	});
	return (
		<HoverCard.RootProvider unmountOnExit value={api}>
			<HoverCard.Trigger
				data-test={props.testAttr}
				type={"button"}
				onClick={(e) => e.stopPropagation()}
				class={twMerge(
					"inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-3 py-2 font-normal text-white text-xs transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:text-gray-500 dark:focus:ring-offset-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300",
					props.btnClass
				)}
				asChild={(btnProps) => <button {...btnProps()} />}
			>
				{props.btnContent}
				<Show when={!props.isNeedToHiderArrow}>
					<svg
						class="h-2.5 w-2.5 text-white"
						classList={{
							"rotate-180": api().open
						}}
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				</Show>
			</HoverCard.Trigger>
			<Portal>
				<HoverCard.Positioner
				// class={twMerge(props.containerClass && props.containerClass)}
				>
					<HoverCard.Content
						class={twMerge(
							"z-10 flex min-w-48 flex-col items-start justify-start gap-2 rounded-lg bg-gray-800 p-1 py-2 shadow-md",
							props.containerClass
						)}
						onClick={(e) => e.stopPropagation()}
						ref={elContainerRef!}
					>
						{props.children}
					</HoverCard.Content>
				</HoverCard.Positioner>
			</Portal>
		</HoverCard.RootProvider>
	);
};
