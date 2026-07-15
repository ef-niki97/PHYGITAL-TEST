import { useQuery } from "@tanstack/solid-query";
import { type Component, createEffect, createMemo, createSignal, For, Show } from "solid-js";
import type { IMlBaseItem } from "~/js/network/airtable-ml-base";
import { getMergeMlBaseOptions } from "~/js/network/mergeMlBase";
import { isNodeSidebarHidden } from "~/solidJs/shared/helpers/nodeHelpers";
import { Skeleton } from "~/solidJs/shared/ui/atoms/Skeleton/Skeleton";
import { useSidebarContext } from "../context";
import type { GroupedItems, GroupedItemsEntries } from "../models";
import CategoryGroup from "./CategoryGroup";
import NodeCard from "./NodeCard";

interface AIToolsTabProps {
	listClass: string;
	stableDiffusionId: string;
	isActive: boolean;
	shouldFetch: boolean;
	onLoaded?: () => void;
}

export const AIToolsSkeleton: Component = () => {
	const rows = Array.from({ length: 20 });
	return (
		<div class="flex min-h-full w-full flex-col gap-2 px-2">
			<div class="px-2">
				<Skeleton variant="light" class="h-6 w-32" />
			</div>

			<For each={rows}>
				{() => (
					<div class="flex items-center gap-2.5 rounded-xl p-2">
						<div class="size-11 shrink-0 overflow-hidden rounded-[10px] border border-border-secondary">
							<Skeleton variant="light" class="h-full w-full rounded-[10px]" />
						</div>

						<div class="flex min-w-0 flex-1 flex-col gap-2">
							<div class="flex items-center gap-2">
								<Skeleton variant="light" class="h-4 w-40" />
								<Skeleton variant="light" class="h-4 w-10 rounded-[4px]" />
							</div>
							<Skeleton variant="light" class="h-3 w-28" />
						</div>
					</div>
				)}
			</For>
		</div>
	);
};

const AIToolsTab: Component<AIToolsTabProps> = (props) => {
	const store = useSidebarContext();

	// Fetch is orchestrated by parent: active first, then background for inactive.
	const mergeNodeData = useQuery(() => ({
		...getMergeMlBaseOptions(store.userGroup()),
		enabled: props.shouldFetch
	}));

	const [hasNotifiedLoaded, setHasNotifiedLoaded] = createSignal(false);

	createEffect(() => {
		// Notify parent once, when data is ready (even if this tab is currently inactive).
		if (!hasNotifiedLoaded() && mergeNodeData.status === "success") {
			setHasNotifiedLoaded(true);
			props.onLoaded?.();
		}
	});

	const getGroupedAiToolsItems = createMemo((): GroupedItemsEntries<IMlBaseItem> => {
		// IMPORTANT: don't touch mergeNodeData.data until success, to avoid any Suspense-like behavior.
		if (mergeNodeData.status !== "success" || !mergeNodeData.data) return [];

		const groups: GroupedItems<IMlBaseItem> = {};
		for (const baseItem of mergeNodeData.data) {
			const node = baseItem.node;
			if (isNodeSidebarHidden(node)) continue;
			if (!baseItem.category) continue;

			const category = baseItem.category;
			if (!groups[category]) groups[category] = [];
			groups[category].push(baseItem);
		}

		return Object.entries(groups);
	});

	// Skeleton must be local: only for active tab, and only during its own first load.
	const shouldShowSkeleton = () => {
		if (!props.isActive) return false;

		// If we already have data, never show skeleton again.
		if (mergeNodeData.status === "success" && mergeNodeData.data) return false;

		// Only initial pending state should show skeleton.
		return mergeNodeData.status === "pending";
	};

	return (
		<div
			id="ai-models"
			class={props.listClass}
			style={{
				display: props.isActive ? "flex" : "none",
				overflow: shouldShowSkeleton() ? "hidden" : undefined
			}}
		>
			<Show
				when={
					!shouldShowSkeleton() &&
					mergeNodeData.status === "success" &&
					mergeNodeData.data
				}
				fallback={<AIToolsSkeleton />}
			>
				<For each={getGroupedAiToolsItems()}>
					{([category, items]) => (
						<CategoryGroup category={category.toString()} itemCount={items.length}>
							<For each={items}>
								{(item) => (
									<NodeCard
										baseItem={item}
										isTutorSelected={item.globalId === props.stableDiffusionId}
										testAttrPrefix="list"
									/>
								)}
							</For>
						</CategoryGroup>
					)}
				</For>
			</Show>
		</div>
	);
};

export default AIToolsTab;
