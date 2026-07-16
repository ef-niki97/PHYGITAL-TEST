import { Shuffle, Wand2 } from "lucide-solid";
import styles from "./WorkspaceCanvas.module.scss";
import { NodeField, NodeSelect, WorkspaceNode } from "./WorkspaceNode";

function PromptActions() {
	return (
		<div class="flex gap-2">
			<button type="button" class="flex items-center gap-1 rounded-md bg-background-gray-light px-2 py-1 text-xs font-medium text-text-primary">
				<Shuffle size={12} />
				Random
			</button>
			<button type="button" class="flex items-center gap-1 rounded-md bg-background-gray-light px-2 py-1 text-xs font-medium text-text-primary">
				<Wand2 size={12} />
				Improve
			</button>
		</div>
	);
}

function ConnectorLine() {
	return (
		<svg class="pointer-events-none absolute" style={{ left: "998px", top: "470px", width: "73px", height: "404px" }} viewBox="0 0 73 404" fill="none">
			<path d="M1 1C1 200 72 200 72 403" stroke="var(--interaction-violet, #7d46ea)" stroke-width="1.5" stroke-dasharray="4 4" />
			<circle cx="1" cy="1" r="4" fill="#f97316" />
			<circle cx="72" cy="403" r="4" fill="#f97316" />
		</svg>
	);
}

export function WorkspaceCanvas() {
	return (
		<div class={`absolute inset-0 -z-10 ${styles.canvas}`}>
			<ConnectorLine />

			<WorkspaceNode
				title="GPT Text"
				status={{ label: "Successful 30 of 30", tone: "success" }}
				actionLabel="Re-generate"
				actionRuns={30}
				actionCredits={15}
				style={{ left: "633px", top: "193px" }}
			>
				<NodeField label="Model Version">
					<NodeSelect value="GPT 5 Mini" />
				</NodeField>
				<NodeField label="Mode">
					<NodeSelect value="···" />
				</NodeField>
				<NodeField label="Prompt">
					<div class="flex flex-col gap-2 rounded-md border border-border-secondary p-2">
						<p class="text-xs text-text-primary">Generate something unusual!</p>
						<PromptActions />
					</div>
				</NodeField>
				<NodeField label="Images (Optional)">
					<div class="h-16 rounded-md border border-dashed border-border-secondary" />
				</NodeField>
				<NodeField label="Answer">
					<div class="flex flex-col gap-2 rounded-md border border-border-secondary p-2">
						<p class="text-xs leading-relaxed text-text-secondary-v2">
							I'm not sure exactly what you mean by "randim" — do you want a randomly generated image, a prompt for an image
							generator, or an actual image file (or ASCII art)? Tell me which and a couple preferences (style, subject, realism,
							size, model/platform) — or pick one of the quick random prompts below and I'll expand it into a full prompt or
							generation recipe.{" "}
							<button type="button" class="font-medium text-interaction-violet">
								Show more
							</button>
						</p>
						<div class="flex items-center justify-between">
							<div class="flex gap-1">
								{Array.from({ length: 5 }).map(() => (
									<span class="flex size-6 items-center justify-center rounded-md bg-background-gray-light text-xs font-medium text-text-secondary-v2">
										T
									</span>
								))}
							</div>
							<button type="button" class="text-xs font-medium text-interaction-violet">
								All results
							</button>
						</div>
					</div>
				</NodeField>
			</WorkspaceNode>

			<WorkspaceNode
				title="Nano Banana"
				status={{ label: "Click to start creating", tone: "muted" }}
				actionLabel="Generate"
				actionRuns={1}
				actionCredits={65}
				style={{ left: "1084px", top: "219px" }}
			>
				<div class="flex items-center justify-between">
					<p class="text-xs font-medium text-text-secondary-v2">Image</p>
					<span class="size-2 rounded-full bg-status-warning" />
				</div>
				<NodeField label="Prompt">
					<div class="flex flex-col gap-2 rounded-md border border-border-secondary p-2">
						<p class="text-xs text-text-primary">
							center middle large empty space, aerial view of a yoghurts, milk, curd, on a soft pastel blue background
						</p>
						<PromptActions />
					</div>
				</NodeField>
				<NodeField label="Start Images">
					<div class="h-16 rounded-md border border-dashed border-border-secondary" />
				</NodeField>
				<NodeField label="Version">
					<NodeSelect value="v2.5" />
				</NodeField>
				<NodeField label="Size (Aspect Ration)">
					<NodeSelect value="Auto" />
				</NodeField>
				<NodeField label="Quality">
					<NodeSelect value="···" />
				</NodeField>
			</WorkspaceNode>
		</div>
	);
}
