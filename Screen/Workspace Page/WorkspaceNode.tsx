import { ChevronDown, Coins, RotateCcw, Sparkles } from "lucide-solid";
import type { JSX } from "solid-js";

export type WorkspaceNodeProps = {
	title: string;
	status?: { label: string; tone: "success" | "muted" };
	actionLabel: string;
	actionCredits: number;
	actionRuns?: number;
	style?: JSX.CSSProperties;
	children: JSX.Element;
};

export function WorkspaceNode(props: WorkspaceNodeProps) {
	return (
		<div class="absolute flex w-[350px] flex-col gap-3 rounded-2xl bg-white p-3 shadow-card" style={props.style}>
			<div class="flex items-center justify-between">
				<p class="text-sm font-semibold text-text-primary">{props.title}</p>
				<button type="button" class="flex items-center gap-1 rounded-md bg-background-gray-light px-2 py-1 text-xs font-medium text-text-primary">
					<Sparkles size={12} />
					Ask AI
				</button>
			</div>

			{props.status && (
				<p class={`text-xs font-medium ${props.status.tone === "success" ? "text-status-success" : "text-text-secondary-v2"}`}>
					{props.status.label}
				</p>
			)}

			<div class="flex items-center gap-0.5 rounded-lg bg-background-black p-1">
				<button type="button" class="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-white/70">
					<RotateCcw size={14} />
					{props.actionRuns ?? 1}
				</button>
				<button type="button" class="flex-1 rounded-md bg-background-black py-1.5 text-center text-sm font-semibold text-white">
					{props.actionLabel}
				</button>
				<span class="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-white/70">
					<Coins size={14} />
					{props.actionCredits}
				</span>
			</div>

			{props.children}
		</div>
	);
}

export function NodeField(props: { label: string; children: JSX.Element }) {
	return (
		<div class="flex flex-col gap-1.5">
			<p class="text-xs font-medium text-text-secondary-v2">{props.label}</p>
			{props.children}
		</div>
	);
}

export function NodeSelect(props: { value: string }) {
	return (
		<div class="flex items-center justify-between rounded-md border border-border-secondary px-2.5 py-2 text-xs text-text-primary">
			<span>{props.value}</span>
			<ChevronDown size={14} class="text-text-secondary-v2" />
		</div>
	);
}
