import type { Component } from "solid-js";
import { Show } from "solid-js/web";
import ReloadIcon from "~/Icons/20_Icon_Synchronize.svg?component-solid";
import { DebugFlags, isDebugFlag, useCustomContext } from "~/solidJs/shared";
import { logToSentry } from "~/solidJs/shared/helpers/sentry";
import { VersionModel } from "~/solidJs/shared/helpers/versionHelpers";
import { useSaveWorkspaceFeature } from "~/solidJs/shared/hooks/useSaveWorkspaceFeature";
import { Button } from "~/solidJs/shared/ui";

export const StickyHeader: Component = () => {
	const versionCtx = useCustomContext(VersionModel.VersionContext);
	const sucssfullState = () => {
		versionCtx.setIsMinorUpdateVisible(false);
		window.location.reload();
	};
	const saveFeature = useSaveWorkspaceFeature({
		afterSaveCallback: sucssfullState,
		skipShowSavedModal: true
	});

	return (
		<Show
			when={versionCtx.getIsMinorUpdateVisible() || isDebugFlag(DebugFlags.MinorUpdateModal)}
		>
			<div class="z-[2] flex h-12 w-full items-center justify-center gap-5 bg-status-positive px-3 py-1.5 text-status-accent-positive">
				<div class="caption-13-medium flex items-center justify-center gap-1.5">
					<ReloadIcon />A new update is available! Reload the page for the best experience
				</div>
				<Button
					pending={saveFeature.getIsPending()}
					disabled={saveFeature.getIsDisabled()}
					onClick={() => {
						logToSentry("MinorUpdateStickyWidget: save & reload clicked", "info");
						saveFeature.save();
					}}
					variant="SecondaryAccent"
				>
					Save & Reload
				</Button>
			</div>
		</Show>
	);
};
