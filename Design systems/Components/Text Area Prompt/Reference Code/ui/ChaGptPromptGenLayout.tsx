import type { Component } from "solid-js";
import { createEffect, createSignal, For, Show } from "solid-js";
import { PromptGenContext } from "~/solidJs/entities/ChatGptEntities/ChatGptPromptGenLayout/models/contexts/PromptGenContext";
import {
	Message,
	MessageFeatureWrapper,
	MessageWithFeatures
} from "~/solidJs/entities/ChatGptEntities/ChatMessageLayout/ui/Message";
import { getUserStore } from "~/solidJs/entities/HeaderMain/models";
import { ChatGptDeleteMessageFeature } from "~/solidJs/features/ChatGptFeatures/ChatGptDeleteMessageFeature/ChatGptDeleteMessageFeature";
import { ChatGptMessageFeatures } from "~/solidJs/features/ChatGptFeatures/ChatGptMessageFeatures/ChatGptMessageFeatures";
import { sessionCounter, useCustomContext } from "~/solidJs/shared/helpers";
import { UserSubscriptionPlanEnum } from "~/solidJs/shared/helpers/types";
import { Spinner } from "~/solidJs/shared/ui";
import { ChatGptContext } from "../../ChatGptMainLayout/models/contexts/chatGptModeContext";
import { MessageContext } from "../../ChatMessageLayout";

type ChaGptPromptDenLayoutProps = Record<string, never>;

export const ChaGptPromptGenLayout: Component<ChaGptPromptDenLayoutProps> = (_props) => {
	const { getChatGptModesStateStore } = useCustomContext(ChatGptContext);
	return (
		<div class="flex h-full w-full flex-col gap-2">
			<ChatGptHintMessage />
			<Show
				when={getChatGptModesStateStore.promptGeneration.messages.find(
					(msg) => msg.messageRole === "user" && "prompt" in msg
				)}
				keyed
			>
				{/* @ts-ignore */}
				{(msg) => <Message messageRole={"user"}>{msg.prompt}</Message>}
			</Show>
			<Show
				when={getChatGptModesStateStore.promptGeneration.messages.find(
					(msg) => msg.messageRole === "assistant"
				)}
				keyed
			>
				{(msg) => (
					<MessageContext.Provider
						value={{
							messageRole: "assistant",
							// @ts-expect-error
							prompt: () => msg.prompt
						}}
					>
						<MessageWithFeatures
							Features={<ChatGptMessageFeatures />}
							messageRole={"assistant"}
						>
							{/* @ts-ignore */}
							{msg.prompt}
						</MessageWithFeatures>
					</MessageContext.Provider>
				)}
			</Show>
			<Show when={getChatGptModesStateStore[getChatGptModesStateStore.mode].isPending}>
				<MessageContext.Provider
					value={{
						messageRole: "assistant",
						prompt: () => ""
					}}
				>
					<Message messageRole="assistant">
						<Spinner />
					</Message>
				</MessageContext.Provider>
			</Show>
		</div>
	);
};
export const ChatGptHintMessage: Component = () => {
	const {
		hintRes: [hintRes]
	} = useCustomContext(PromptGenContext);

	const [getHintText, setHintText] = createSignal<string[]>([]);

	createEffect(() => {
		const hintsresVal = hintRes();
		if (!hintsresVal) return null;
		const hints = hintsresVal.hints;
		const curSession = sessionCounter.getCurSessionCount();
		if (!(curSession in hints)) return;
		const hint = hints[curSession];
		if (hint.scheduleTimeSpend) {
			sessionCounter.timeCounter.addCallbackToTime(hint.scheduleTimeSpend, () => {
				setHintText((prev) => {
					prev.push(hint.hint);
					return prev.concat([]);
				});
			});
			return;
		}
		setHintText((prev) => {
			prev.push(hint.hint);
			return prev.concat([]);
		});
	});
	createEffect((prev: boolean) => {
		if (prev) return true;
		const hintsresVal = hintRes();
		if (!hintsresVal) return false;
		const userGroup = getUserStore()?.group;
		if (!userGroup) return false;
		const scheduledHints = hintsresVal.scheduledHints;
		for (const hint of scheduledHints) {
			if (hint.groupMap !== undefined && !(userGroup in hint.groupMap)) {
				continue;
			}
			if (!hint.groupMap && userGroup !== UserSubscriptionPlanEnum.Legacy_Freemium) {
				continue;
			}

			sessionCounter.timeCounter.addCallbackToTime(hint.scheduleTimeSpend, () => {
				setHintText((prev) => {
					prev.push(hint.hint);
					return prev.concat([]);
				});
			});
		}
		return true;
	}, false);
	const deleteHint = (id: number) => {
		setHintText((prev) => {
			prev.splice(id, 1);
			return [...prev];
		});
	};
	return (
		<For each={getHintText()}>
			{(hintText, id) => (
				<MessageFeatureWrapper>
					<ChatGptDeleteMessageFeature
						deleteFc={deleteHint}
						id={id()}
						class="absolute right-0"
					/>
					<Message messageRole={"hint"}>
						<div innerHTML={hintText} />
					</Message>
				</MessageFeatureWrapper>
			)}
		</For>
	);
};
