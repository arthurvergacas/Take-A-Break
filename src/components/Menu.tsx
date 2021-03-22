import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "../styles/components/Menu.module.css";

import Link from "next/link";

interface MenuProps {
	children: ReactNode;
}

export function Menu(props: MenuProps) {
	const [location, setLocation] = useState("");

	const homeDiv = useRef(null);
	const aboutDiv = useRef(null);

	const transitionTime = 225;

	function onLocationChange() {
		// HARDCODED The '-5' is there to make the transition smoother and so the moment when the
		//           definitive div appears is not visible

		// Also worth noting that getBoundingClientRect().x is used, even though I'm moving the div in the Y-axis direction

		// going from home to about
		if (location === "/") {
			homeDiv.current.style.transform = `translateY(${
				aboutDiv.current.getBoundingClientRect().x - 5
			}px)`;

			setTimeout(() => {
				setLocation(window.location.pathname);
				homeDiv.current.style.transform = "";
			}, transitionTime);
		}
		// going from about to home
		else if (location === "/about") {
			aboutDiv.current.style.transform = `translateY(-${
				homeDiv.current.getBoundingClientRect().x - 5
			}px)`;

			setTimeout(() => {
				setLocation(window.location.pathname);
				aboutDiv.current.style.transform = "";
			}, transitionTime);
		}
	}

	useEffect(() => {
		setLocation(window.location.pathname);
	}, []);

	if (typeof window !== "undefined") {
		useEffect(() => {
			onLocationChange();
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
							<div
								className={`${location == "/" ? styles.activeLink : ""}`}
								style={{
									transition: `transform ${transitionTime}ms ease-in-out`,
								}}
								ref={homeDiv}
							></div>
						</a>
					</Link>

					<Link href="/about">
						<a>
							<img src="icons/info.svg" alt="Sobre" />
							<div
								className={`${location == "/about" ? styles.activeLink : ""}`}
								style={{
									transition: `transform ${transitionTime}ms ease-in-out`,
								}}
								ref={aboutDiv}
							></div>
						</a>
					</Link>
				</div>
			</div>

			{props.children}
		</div>
	);
}
