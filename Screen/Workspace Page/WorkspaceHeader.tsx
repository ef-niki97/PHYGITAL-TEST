import { ChevronDown, CircleHelp, CloudCheck, Coins, History, Images, Menu, Rocket } from "lucide-solid";

export type WorkspaceHeaderProps = {
	projectName?: string;
	credits?: number;
};

export function WorkspaceHeader(props: WorkspaceHeaderProps) {
	return (
		<header class="flex items-center justify-between gap-5 p-2">
			<div class="flex h-14 items-center gap-5 rounded-2xl bg-background-white px-4 py-3 shadow-card">
				<div class="flex items-center gap-0.5">
					<button type="button" class="flex items-center justify-center rounded-md p-1 hover:bg-background-gray-light" aria-label="Menu">
						<Menu size={24} class="text-text-primary" />
					</button>
					<span class="sr-only">Phygital+</span>
				</div>

				<div class="flex items-center gap-px">
					<div class="flex w-36 items-center justify-center rounded-l-md bg-background-white px-1.5 py-1">
						<p class="max-w-[254px] truncate text-base font-medium text-text-primary">{props.projectName ?? "New project"}</p>
					</div>
					<button type="button" class="flex w-8 items-center justify-center rounded-r-md bg-background-white px-1.5 py-2.5" aria-label="Project menu">
						<ChevronDown size={12} class="text-text-primary" />
					</button>
				</div>

				<div class="flex items-center gap-3">
					<button type="button" class="rounded-md bg-interaction-grey-light px-3 py-2 text-xs font-medium text-text-primary">
						Save project
					</button>
					<div class="flex size-7 items-center justify-center rounded-md bg-background-white p-1" aria-label="Autosaved">
						<CloudCheck size={20} class="text-text-primary" />
					</div>
				</div>
			</div>

			<div class="flex h-14 items-center justify-end gap-5 rounded-2xl bg-background-white px-4 py-3 shadow-card">
				<div class="flex items-center gap-1">
					<button type="button" class="flex items-center justify-center rounded-md p-1 hover:bg-background-gray-light" aria-label="Help">
						<CircleHelp size={20} class="text-text-primary" />
					</button>
					<button type="button" class="flex items-center justify-center rounded-md p-1 hover:bg-background-gray-light" aria-label="Generations history">
						<Images size={20} class="text-text-primary" />
					</button>
					<button type="button" class="flex items-center justify-center rounded-md p-1 hover:bg-background-gray-light" aria-label="History">
						<History size={20} class="text-text-primary" />
					</button>
				</div>

				<div class="flex items-center gap-2">
					<button type="button" class="rounded-md bg-interaction-grey-light px-3 py-2 text-xs font-medium text-text-primary">
						Share
					</button>
					<div class="flex h-8 items-center overflow-clip rounded-md border-[1.5px] border-interaction-violet">
						<div class="flex items-center gap-1 px-2">
							<Coins size={16} class="text-interaction-violet" />
							<p class="text-xs font-medium text-interaction-violet">{props.credits ?? 500}</p>
						</div>
						<button type="button" class="flex h-full w-[98px] items-center justify-center gap-1 bg-interaction-violet px-3 text-xs font-medium text-white">
							<Rocket size={16} />
							Upgrade
						</button>
					</div>
					<div class="flex size-8 items-center justify-center rounded-lg bg-background-gray-medium text-sm font-semibold text-text-primary">S</div>
				</div>
			</div>
		</header>
	);
}
