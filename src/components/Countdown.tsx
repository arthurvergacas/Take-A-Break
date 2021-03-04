import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";
import { Button } from "./Button";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
	const { startNewChallenge, activeChallenge, initialTime } = useContext(
		ChallengesContext
	);

	const [time, setTime] = useState(initialTime); // time in seconds
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = (time / 60) | 0; // bitwise way to round numbers (top)
	const seconds = time % 60;

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(initialTime);
	}

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);

			// start challenge
			startNewChallenge();
		}
	}, [isActive, time]);

	useEffect(() => {
		if (!activeChallenge) {
			resetCountdown();
			setHasFinished(false);
		}
	}, [activeChallenge]);

	return (
		<>
			<div className={styles.container}>
				<div>
					<span>
						{
							minutes.toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})[0]
						}
					</span>
					<span>
						{
							minutes.toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})[1]
						}
					</span>
				</div>
				<span>:</span>
				<div>
					<span>
						{
							seconds.toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})[0]
						}
					</span>
					<span>
						{
							seconds.toLocaleString("en-US", {
								minimumIntegerDigits: 2,
								useGrouping: false,
							})[1]
						}
					</span>
				</div>
			</div>

			{hasFinished ? (
				<button disabled className={`${styles.cycleButton}`}>
					Ciclo encerrado
					<img
						src="icons/check-mark.svg"
						alt="Completado"
						className={styles.completedIcon}
					/>
				</button>
			) : (
				<>
					{isActive ? (
						<Button
							className={`${styles.cycleButton} ${styles.cycleButtonActive}`}
							onClick={resetCountdown}
						>
							Abandonar ciclo
						</Button>
					) : (
						<Button className={styles.cycleButton} onClick={startCountdown}>
							Iniciar ciclo
						</Button>
					)}
				</>
			)}
		</>
	);
}
