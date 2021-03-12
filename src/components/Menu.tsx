import { ReactNode } from "react";

import styles from "../styles/components/Menu.module.css";

import { slide as HamburgerMenu } from "react-burger-menu";
import Link from "next/link";

interface MenuProps {
	children: ReactNode;
}

export function Menu(props: MenuProps) {
	return (
		<div className={styles.container}>
			<HamburgerMenu width={"15rem"}>
				<Link href="/">
					<a id="home" className={`menu-item ${styles.linkContainer}`}>
						Home
					</a>
				</Link>

				<Link href="/about">
					<a id="about" className={`menu-item ${styles.linkContainer}`}>
						Sobre
					</a>
				</Link>
			</HamburgerMenu>

			{props.children}
		</div>
	);
}
