import { ChallengesProvider } from "../contexts/ChallengesContexts";

import { slide as Menu } from "react-burger-menu";

import styles from "../styles/pages/Global.module.css";
import "../styles/global.css";
import "../styles/menuStyles.css";

function MoveIt({ Component, pageProps }) {
	return (
		<ChallengesProvider>
			<div className={styles.container}>
				<Menu width={"15rem"}>
					<a id="home" className="menu-item" href="/">
						Home
					</a>
					<a id="about" className="menu-item" href="/about">
						Profile
					</a>
					<a id="contact" className="menu-item" href="/contact">
						About
					</a>
				</Menu>
				<Component {...pageProps} />
			</div>
		</ChallengesProvider>
	);
}

export default MoveIt;
