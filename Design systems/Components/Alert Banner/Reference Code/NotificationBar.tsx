import type { Component, JSX } from "solid-js";
import classes from "./NotificationBar.module.scss";

type NotificationBarProps = {
	children: JSX.Element;
	class?: string;
};

export const NotificationBar: Component<NotificationBarProps> = (props) => {
	return (
		<div class={`${props.class || ""} ${classes.notificationBarContainer}`}>
			{props.children}
		</div>
	);
};
