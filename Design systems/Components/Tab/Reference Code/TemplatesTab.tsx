import { useQuery } from "@tanstack/solid-query";
import { type Component, createEffect, createMemo, createSignal, For, Show } from "solid-js";
import type { ITpltBaseAirtableItemMerged } from "~/js/network/airtable-tpl-base";
import { getAirtableTemplatesAndTaskMergedOptions } from "~/js/network/airtable-tpl-base";
import { Skeleton } from "~/solidJs/shared/ui/atoms/Skeleton/Skeleton";
import type { GroupedItems, GroupedItemsEntries } from "../models";
import CategoryGroup from "./CategoryGroup";
import TemplateCard from "./TemplateCard";

interface TemplatesTabProps {
	listClass: string;
	isActive: boolean;
	shouldFetch: boolean;
	onLoaded?: () => void;
}

export const TemplatesSkeleton: Component = () => {
	const rows = Array.from({ length: 20 });
	return (
		<div class="flex min-h-full w-full flex-col gap-2 px-2">
			<div class="px-2">
				<Skeleton variant="light" class="h-6 w-40" />
			</div>

			<For each={rows}>
				{() => (
					<div class="flex items-center gap-2.5 rounded-xl p-2">
						<div class="h-[72px] w-[120px] shrink-0 overflow-hidden rounded-lg border border-border-secondary">
							<Skeleton variant="light" class="h-full w-full rounded-lg" />
						</div>

						<div class="flex min-w-0 flex-1 flex-col gap-2">
							<Skeleton variant="light" class="h-4 w-48" />
							<Skeleton variant="light" class="h-3 w-40" />
						</div>
					</div>
				)}
			</For>
		</div>
	);
};

const TemplatesTab: Component<TemplatesTabProps> = (props) => {
	// Fetch is orchestrated by parent: active first, then background for inactive.
	// IMPORTANT: while this tab is inactive, we must NOT access templateData.data until status === "success",
	// otherwise Solid Query can suspend the tree (Suspense) and "block" the active tab UI.
	const templateData = useQuery(() => ({
		...getAirtableTemplatesAndTaskMergedOptions(),
		enabled: props.shouldFetch
	}));

	const [hasNotifiedLoaded, setHasNotifiedLoaded] = createSignal(false);

	createEffect(() => {
		if (!hasNotifiedLoaded() && templateData.status === "success") {
			setHasNotifiedLoaded(true);
			props.onLoaded?.();
		}
	});

	const safeData = createMemo(() => {
		if (templateData.status !== "success") return null;
		return templateData.data || null;
	});

	const getGroupedTemplatesItems = createMemo(
		(): GroupedItemsEntries<ITpltBaseAirtableItemMerged> => {
			const currentData = safeData();
			if (!currentData) return [];

			const groups: GroupedItems<ITpltBaseAirtableItemMerged> = {};
			for (const baseItem of currentData) {
				if (!baseItem.groupName) continue;

				const category = baseItem.groupName;
				if (!groups[category]) groups[category] = [];
				groups[category].push(baseItem);
			}

			return Object.entries(groups);
		}
	);

	// Skeleton must be local: only for active tab, and only while its own data is pending.
	const shouldShowSkeleton = () => {
		if (!props.isActive) return false;

		// If we already have data, don't show skeleton.
		if (templateData.status === "success" && templateData.data) return false;

		// Only initial pending state should show skeleton.
		return templateData.status === "pending";
	};

	return (
		<div
			id="templates-list"
			class={props.listClass}
			style={{
				display: props.isActive ? "flex" : "none",
				overflow: shouldShowSkeleton() ? "hidden" : undefined
			}}
		>
			<Show
				when={!shouldShowSkeleton() && templateData.status === "success" && safeData()}
				fallback={<TemplatesSkeleton />}
			>
				<For each={getGroupedTemplatesItems()}>
					{([category, items]) => (
						<CategoryGroup
							class="gap-2"
							category={category.toString()}
							itemCount={items.length}
						>
							<For each={items}>
								{(item) => <TemplateCard baseItem={item} testAttrPrefix="list" />}
							</For>
						</CategoryGroup>
					)}
				</For>
			</Show>
		</div>
	);
};

export default TemplatesTab;
