import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
	const { activeChallenge, resetChallenge, onChallengeCompleted } = useContext(
		ChallengesContext
	);

	return (
		<div className={styles.container}>
			{activeChallenge ? (
				<div className={styles.challengeActive}>
					<header>Ganhe {activeChallenge.xp} xp</header>

					<main>
						{activeChallenge.type === "body" ? (
							<img src="icons/biceps.png" alt="Se exercite!" />
						) : (
							<img src="icons/eyes.png" alt="Se exercite!" />
						)}

						<strong>Novo desafio</strong>
						<p>{activeChallenge.text}</p>
					</main>

					<footer>
						<button
							type="button"
							className={styles.challengeFailedBtn}
							onClick={resetChallenge}
						>
							Falhei
						</button>
						<button
							type="button"
							className={styles.challengeCompletedBtn}
							onClick={() => onChallengeCompleted(activeChallenge.xp)}
						>
							Completei
						</button>
					</footer>
				</div>
			) : (
				<div className={styles.challengeNotActive}>
					<strong>Termine um ciclo para receber um desafio</strong>
					<p>
						<img
							src="icons/up-arrow.svg"
							alt="Level"
							className={styles.levelArrow}
						/>
						Avance de nível completando desafios
					</p>
				</div>
			)}
		</div>
	);
}
