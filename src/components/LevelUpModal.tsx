import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/LevelUpModal.module.css";
import { Modal } from "./Modal";

export function LevelUpModal() {
	const { level, disableLvlUpModal } = useContext(ChallengesContext);

	return (
		<Modal disableFunction={disableLvlUpModal}>
			<header className={styles.level}>{level}</header>

			<strong className={styles.strong}>Parabéns</strong>
			<p className={styles.p}>Você subiu de nível!</p>
		</Modal>
	);
}
