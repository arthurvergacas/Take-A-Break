import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
	const { level } = useContext(ChallengesContext);

	return (
		<div className={styles.profileContainer}>
			<img src="https://github.com/arthurvergacas.png" alt="Arthur Vergaças" />
			<div>
				<strong>Arthur Vergaças</strong>
				<p>
					<img
						src="icons/up-arrow.svg"
						alt="Level"
						className={styles.levelArrow}
					/>
					Nível {level}
				</p>
			</div>
		</div>
	);
}
