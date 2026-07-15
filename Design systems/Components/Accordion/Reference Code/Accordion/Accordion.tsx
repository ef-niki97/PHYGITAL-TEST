import { type Component, createSignal, type JSX, type Setter, Show } from "solid-js";
import classes from "./Accordion.module.scss";

type AccordionProps = {
	header: JSX.Element;
	children: JSX.Element;
	accordionHeaderRenderFc: typeof AccordionHeader;
	removeDefaultContainer?: boolean;
	headerClassName?: string;
};

export const Accordion: Component<AccordionProps> = (props) => {
	const [getIsOpened, setIsOpened] = createSignal(false);

	return (
		<>
			<props.accordionHeaderRenderFc
				isOpen={getIsOpened()}
				setIsOpened={setIsOpened}
				class={props.headerClassName}
			>
				{props.header}
			</props.accordionHeaderRenderFc>
			<Show when={getIsOpened()}>
				{props.removeDefaultContainer ? (
					props.children
				) : (
					<div class={`${classes.accordionBodyContainer} ${classes.opened}`}>
						{props.children}
					</div>
				)}
			</Show>
		</>
	);
};
export const DefaultAccordionBodyContainer: Component<{ children: JSX.Element }> = (props) => {
	return (
		<div class={`${classes.accordionBodyContainer} ${classes.opened}`}>{props.children}</div>
	);
};
type DefaultAccordionContainerProps = {
	children: JSX.Element;
};
export const DefaultAccordionContainer: Component<DefaultAccordionContainerProps> = (props) => {
	return <div class={classes.accordionContainer}>{props.children}</div>;
};
type AccordionHeaderProps = {
	setIsOpened: Setter<boolean>;
	children: JSX.Element;
	isOpen: boolean;
	class?: string;
};
export type AccordionHeaderComponent = Component<AccordionHeaderProps>;
export const AccordionHeader: AccordionHeaderComponent = (props) => {
	return (
		<button
			type="button"
			class={`${classes.accordionHeaderContainer} ${props.class || ""}`}
			onClick={() => props.setIsOpened((prev) => !prev)}
		>
			{props.children}
		</button>
	);
};
export const AccordionGroupHeader: Component<AccordionHeaderProps> = (props) => {
	return (
		<button
			type="button"
			class={classes.accordionHeaderContainer}
			onClick={() => props.setIsOpened((prev) => !prev)}
		>
			{props.children}
		</button>
	);
};
