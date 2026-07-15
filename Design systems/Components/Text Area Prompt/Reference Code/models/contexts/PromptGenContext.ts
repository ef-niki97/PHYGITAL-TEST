import { createContext, type ResourceReturn } from "solid-js";
import type { getChatGptHints } from "~/solidJs/widgets/ChatGpt/api/getChatGptHints";

export const PromptGenContext = createContext<{
	hintRes: ResourceReturn<Awaited<ReturnType<typeof getChatGptHints>>>;
}>();
