import { Eraser, Layers, PenTool } from "lucide-solid";

export function AdditionalTools() {
	return (
		<div class="absolute right-0 top-[72px] flex w-16 flex-col gap-2 p-2">
			<button type="button" class="flex h-10 w-full items-center justify-center rounded-lg bg-white" aria-label="Inpainting">
				<Eraser size={16} class="text-text-primary" />
			</button>
			<button type="button" class="flex h-10 w-full items-center justify-center rounded-lg bg-white" aria-label="Sketching">
				<PenTool size={16} class="text-text-primary" />
			</button>
			<button type="button" class="flex h-10 w-full items-center justify-center rounded-lg bg-white" aria-label="Compose">
				<Layers size={16} class="text-text-primary" />
			</button>
		</div>
	);
}
