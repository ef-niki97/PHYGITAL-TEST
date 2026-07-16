import { AdditionalTools } from "./AdditionalTools";
import { PanelTools } from "./PanelTools";
import { WorkspaceCanvas } from "./WorkspaceCanvas";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceSidebar } from "./WorkspaceSidebar";

export function WorkspacePage() {
	return (
		<div class="relative h-screen w-full overflow-hidden">
			<WorkspaceCanvas />

			<div class="absolute inset-x-0 top-0">
				<WorkspaceHeader />
			</div>

			<div class="absolute bottom-0 left-0 top-[72px]">
				<WorkspaceSidebar />
			</div>

			<AdditionalTools />
			<PanelTools />
		</div>
	);
}
