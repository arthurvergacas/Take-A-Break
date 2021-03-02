import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
	const { currentExperience, maxXp } = useContext(ChallengesContext);

	return (
		<header className={styles.experienceBar}>
			<span>0 xp</span>
			<div>
				<div style={{ width: `${(currentExperience / maxXp) * 100}%` }}>
					<span
						className={styles.currentExperience}
						style={{ left: `${(currentExperience / maxXp) * 100}%` }}
					>
						{currentExperience} xp
					</span>
				</div>
			</div>
			<span>{maxXp} xp</span>
		</header>
	);
}
