import FlipNumbers from "react-flip-numbers";

import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
	const { challengesCompleted } = useContext(ChallengesContext);

	return (
		<div className={styles.container}>
			<span>Desafios completos</span>
			<FlipNumbers
				height={19}
				width={19}
				color="#3a4252"
				play={challengesCompleted !== 0}
				perspective={100}
				duration={0.7}
				numbers={`${challengesCompleted}`}
			/>
		</div>
	);
}
