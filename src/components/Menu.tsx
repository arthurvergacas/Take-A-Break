import { ReactNode, useEffect, useState } from "react";

import styles from "../styles/components/Menu.module.css";

import Link from "next/link";

interface MenuProps {
	children: ReactNode;
}

export function Menu(props: MenuProps) {
	const [location, setLocation] = useState("");

	if (typeof window !== "undefined") {
		useEffect(() => {
			setLocation(window.location.pathname);
		}, [window.location.pathname]);
	}
	return (
		<div className={styles.container}>
			<div className={styles.menuBox}>
				<img src="img/chronometer.png" alt="Take A Break" />

				<div className={styles.links}>
					<Link href="/">
						<a>
							<img src="icons/home.svg" alt="Home" />
							<div className={location == "/" ? styles.activeLink : ""}></div>
						</a>
					</Link>

					<Link href="/about">
						<a>
							<img src="icons/info.svg" alt="Sobre" />
							<div
								className={location == "/about" ? styles.activeLink : ""}
							></div>
						</a>
					</Link>
				</div>
			</div>

			{props.children}
		</div>
	);
}
