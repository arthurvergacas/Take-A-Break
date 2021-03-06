import { ReactNode } from "react";

import styles from "../styles/components/Menu.module.css";

import { slide as HamburgerMenu } from "react-burger-menu";

interface MenuProps {
	children: ReactNode;
}

export function Menu(props: MenuProps) {
	return (
		<div className={styles.container}>
			<HamburgerMenu width={"15rem"}>
				<a id="home" className="menu-item" href="/">
					Home
				</a>
				<a id="about" className="menu-item" href="/about">
					Profile
				</a>
				<a id="contact" className="menu-item" href="/contact">
					About
				</a>
			</HamburgerMenu>

			{props.children}
		</div>
	);
}