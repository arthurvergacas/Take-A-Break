// TODO remove this dumb useless component jeez

import styles from "../styles/components/Button.module.css";

import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
	className?: string;
	onClick?: (
		event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => void;
	children: ReactNode;
}

export function Button(props: ButtonProps) {
	return (
		<button
			type="button"
			className={`${props.className} ${styles.defaultBtn}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
