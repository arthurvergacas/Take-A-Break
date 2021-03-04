import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
	const { level, disableLvlUpModal } = useContext(ChallengesContext);

	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<header>{level}</header>

				<strong>Parabéns</strong>
				<p>Você subiu de nível!</p>

				<button type="button">
					<img
						src="icons/close.svg"
						alt="Fechar Modal"
						onClick={disableLvlUpModal}
					/>
				</button>
			</div>
		</div>
	);
}
