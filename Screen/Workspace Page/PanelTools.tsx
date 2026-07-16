import { Focus, LayoutGrid, Redo2, Scissors, Sparkles, Undo2, ZoomIn, CircleHelp } from "lucide-solid";

function ToolButton(props: { label: string; onClick?: () => void; children: any }) {
	return (
		<button
			type="button"
			class="flex size-10 items-center justify-center rounded-lg bg-white p-3 text-text-primary hover:bg-background-gray-light"
			aria-label={props.label}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export function PanelTools() {
	return (
		<div class="absolute bottom-0 right-0 flex items-center gap-2 p-2">
			<div class="flex h-10 items-center gap-0.5 rounded-lg bg-white px-1">
				<ToolButton label="Undo">
					<Undo2 size={16} />
				</ToolButton>
				<ToolButton label="Redo">
					<Redo2 size={16} />
				</ToolButton>
			</div>

			<ToolButton label="Align nodes">
				<LayoutGrid size={16} />
			</ToolButton>
			<ToolButton label="Cut connections">
				<Scissors size={16} />
			</ToolButton>
			<ToolButton label="Fit to screen">
				<Focus size={16} />
			</ToolButton>

			<div class="flex h-10 items-center gap-0.5 rounded-lg bg-white px-1">
				<ToolButton label="Zoom">
					<ZoomIn size={16} />
				</ToolButton>
				<div class="flex h-8 w-[55px] items-center gap-0 rounded-md pl-1.5 pr-1">
					<p class="w-[29px] text-xs font-medium text-text-primary">120%</p>
				</div>
			</div>

			<button type="button" class="flex h-10 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-text-primary">
				<Sparkles size={16} />
				<span class="text-left leading-[13px]">
					AI
					<br />
					assistant
				</span>
			</button>

			<ToolButton label="Help">
				<CircleHelp size={16} />
			</ToolButton>
		</div>
	);
}
