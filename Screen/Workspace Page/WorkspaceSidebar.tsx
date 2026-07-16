import { ChevronRight, Search } from "lucide-solid";
import { createSignal, For } from "solid-js";
import { sidebarSections, type SidebarToolItem } from "./WorkspaceSidebar.data";

function TemplatesBanner() {
	return (
		<button type="button" class="flex w-full items-center justify-between rounded-2xl bg-interaction-violet-light px-5 py-6 text-left">
			<div class="flex items-center gap-3">
				<span class="text-base font-semibold leading-[18px] tracking-tight-100 text-interaction-violet">Templates for you</span>
			</div>
			<ChevronRight size={16} class="text-interaction-violet" />
		</button>
	);
}

function SidebarTabs(props: { active: "ai-tools" | "templates"; onChange: (tab: "ai-tools" | "templates") => void }) {
	return (
		<div class="flex items-center gap-2">
			<div class="flex flex-1 gap-1 rounded-xl bg-background-gray-light p-1">
				<button
					type="button"
					class={`flex-1 rounded-[10px] px-4 py-3 text-[13px] font-medium tracking-tight-60 ${
						props.active === "ai-tools" ? "bg-background-white text-interaction-violet" : "text-text-secondary-v2"
					}`}
					onClick={() => props.onChange("ai-tools")}
				>
					AI Tools
				</button>
				<button
					type="button"
					class={`flex-1 rounded-[10px] px-4 py-3 text-[13px] font-medium tracking-tight-60 ${
						props.active === "templates" ? "bg-background-white text-interaction-violet" : "text-text-secondary-v2"
					}`}
					onClick={() => props.onChange("templates")}
				>
					Templates
				</button>
			</div>
			<button type="button" class="flex size-[50px] items-center justify-center rounded-xl bg-background-gray-light" aria-label="Search tools">
				<Search size={20} class="text-text-primary" />
			</button>
		</div>
	);
}

function SidebarItem(props: { item: SidebarToolItem }) {
	return (
		<button type="button" class="flex w-full items-center gap-2.5 rounded-xl p-2 text-left hover:bg-background-gray-light">
			<div class="size-11 shrink-0 overflow-clip rounded-lg border border-border-secondary bg-background-gray" />
			<div class="flex min-w-0 flex-1 flex-col gap-2">
				<div class="flex w-full items-center gap-2">
					<p class="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">{props.item.name}</p>
					{props.item.badge && (
						<span class="shrink-0 rounded-md bg-background-gray px-1.5 py-0.5 text-[10px] font-medium text-text-secondary-v2">
							{props.item.badge}
						</span>
					)}
				</div>
				{props.item.subtitle && <p class="truncate text-xs text-text-secondary-v2">{props.item.subtitle}</p>}
			</div>
		</button>
	);
}

export function WorkspaceSidebar() {
	const [activeTab, setActiveTab] = createSignal<"ai-tools" | "templates">("ai-tools");

	return (
		<aside class="flex h-full w-[316px] shrink-0 flex-col gap-2 overflow-y-auto p-2">
			<TemplatesBanner />
			<SidebarTabs active={activeTab()} onChange={setActiveTab} />

			<div class="flex flex-col gap-4">
				<For each={sidebarSections}>
					{(section) => (
						<section class="flex flex-col gap-1">
							<h3 class="px-2 text-xs font-medium uppercase tracking-wide text-text-secondary-v2">{section.heading}</h3>
							<div class="flex flex-col">
								<For each={section.items}>{(item) => <SidebarItem item={item} />}</For>
							</div>
						</section>
					)}
				</For>
			</div>
		</aside>
	);
}
