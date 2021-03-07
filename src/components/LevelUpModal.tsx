import { useContext, useEffect, useState } from "react";
import { Transition } from "react-transition-group";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
	const { level, disableLvlUpModal } = useContext(ChallengesContext);

	const [inProp, setInProp] = useState(false);

	// TODO tweak the animation to make it look better

	const overlayTransitionStyles = {
		entering: { opacity: 1 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
	};

	const modalTransitionStyles = {
		entering: { transform: "scale(1.2)" },
		entered: { transform: "scale(1)" },
		exiting: { transform: "scale(1.1)" },
		exited: { transform: "scale(0)" },
	};

	const duration = 300;
	const transitionStyle = {
		transition: `all ${duration}ms ease-in-out`,
	};

	useEffect(() => {
		setInProp(true);
	}, []);

	function handleModalExit() {
		setInProp(false);
	}

	function actuallyDisabledModal() {
		disableLvlUpModal();
	}

	return (
		<Transition in={inProp} timeout={duration} onExited={actuallyDisabledModal}>
			{(state) => (
				<div
					className={styles.overlay}
					style={{ ...overlayTransitionStyles[state], ...transitionStyle }}
				>
					<div
						className={styles.container}
						style={{ ...modalTransitionStyles[state], ...transitionStyle }}
					>
						<header>{level}</header>

						<strong>Parabéns</strong>
						<p>Você subiu de nível!</p>

						<button type="button">
							<img
								src="icons/close.svg"
								alt="Fechar Modal"
								onClick={handleModalExit}
							/>
						</button>
					</div>
				</div>
			)}
		</Transition>
	);
}
