import { X } from "lucide-solid";
import { type Component, createEffect, createMemo, type JSX, Match, Show, Switch } from "solid-js";
import AddImageIcon from "~/Icons/24_Icon_Add Image.svg?component-solid";
import SendIcon from "~/Icons/24_Icon_Send.svg?component-solid";
import StopIcon from "~/Icons/24_Icon_Stop.svg?component-solid";
import { extensionsByGenerics } from "~/js/network/mime-type-handler";
import {
	Button,
	CustomImage,
	type IFileType,
	type LocalData,
	preventResrverdKeyEvent,
	recalculateTextAreaHeight
} from "~/solidJs/shared";
import { FileInput } from "../../atoms/FileInput/FileInput";

type TextAreaChatProps = {
	files?: LocalData[];
	isPending?: boolean;
	placeholder?: string;
	inputState?: string;
	onSubmit?: () => void;
	onInputChange?: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
	renderFileInput?: boolean;
	onFileSelect?: (files: IFileType[]) => void;
	onImageDelete?: (fileSrc: string) => void; // Added new prop
};
export const TextAreaChat: Component<TextAreaChatProps> = (props) => {
	let ref: HTMLTextAreaElement;

	// Memoize the file data to avoid unnecessary recalculations
	const fileDataMemo = createMemo(() => props.files?.[0]);

	createEffect(() => {
		props.inputState;
		recalculateTextAreaHeight(ref!);
	});

	return (
		<div class="group flex w-full flex-col gap-1.5 rounded-[20px] bg-interaction-grey-light p-1.5 pl-4">
			<Show when={fileDataMemo()} keyed>
				{(fileData) => (
					<div class="flex w-full shrink-0 rounded-md bg-gray-100 pt-2 pl-1">
						<Switch>
							<Match when={"fileSrc" in fileData && fileData} keyed>
								{(data) => (
									<div class="relative inline-block size-16">
										<CustomImage
											containerClassName="size-16 rounded-md"
											class="rounded-md"
											src={data.fileSrc}
										/>
										<Button
											size="small"
											variant="TertiaryNeutralIcon"
											class="!absolute top-[2px] right-[2px] p-1"
											onClick={() => props.onImageDelete?.(data.fileSrc)}
										>
											<X size={12} />
										</Button>
									</div>
								)}
							</Match>
							<Match when={"fileName" in fileData}>
								{
									// @ts-expect-error fileName exists due to the Match condition
									fileData.fileName
								}
								{/* Consider adding a delete button for non-image files too */}
							</Match>
						</Switch>
					</div>
				)}
			</Show>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				class={"relative flex w-full items-end justify-center gap-1.5"}
			>
				<div class="flex w-full items-end justify-end gap-2 self-stretch">
					<Show when={props.renderFileInput}>
						<FileInput
							labelProps={{
								size: "small",
								className: "p-0 cursor-pointer h-11",
								variant: "plain"
							}}
							accept={extensionsByGenerics.image.join(", ")}
							onChange={(e) => {
								if (e.currentTarget.files) {
									props.onFileSelect?.([...e.currentTarget.files]);
								}
							}}
						>
							<AddImageIcon />
						</FileInput>
					</Show>
					<div class="flex h-full w-full items-center justify-center">
						<textarea
							id={"chatGptInput"}
							data-test="chatgpt-textarea"
							placeholder={
								props.placeholder ? props.placeholder : "Type your short prompt..."
							}
							class={
								"h-4 max-h-20 w-full resize-none overflow-auto bg-transparent font-medium text-text-primary text-xs outline-none placeholder:text-text-secondary group-hover:placeholder:text-text-secondary-v2"
							}
							ref={ref!}
							value={props.inputState}
							on:keydown={(e) => {
								preventResrverdKeyEvent(e);
								if (e.code === "Enter" && !e.shiftKey && !e.ctrlKey) {
									e.preventDefault();
									props.onSubmit?.();
								}
							}}
							onInput={(e) => {
								props.onInputChange?.(e);
							}}
						/>
					</div>
				</div>
				<Button
					onClick={props.onSubmit}
					class="!pointer-events-auto h-max rounded-2xl bg-interaction-black p-2.5 hover:bg-interaction-black-hv"
					pending={props.isPending}
					type="submit"
					data-test="chatgpt-send-button"
				>
					<Switch fallback={<SendIcon>Generate</SendIcon>}>
						<Match when={props.isPending}>
							<StopIcon />
						</Match>
					</Switch>
				</Button>
			</form>
		</div>
	);
};
