import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";
import { Button } from "./Button";

import Cookies from "js-cookie";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
	const {
		startNewChallenge,
		activeChallenge,
		initialTime,
		setInitialTime,
	} = useContext(ChallengesContext);

	const [time, setTime] = useState(initialTime); // time in seconds
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);
	const [isPaused, setIsPaused] = useState(false);

	const minutes = (time / 60) | 0; // bitwise way to round numbers (top tier)
	const seconds = time % 60;

	const inactiveArrowsClass =
		isActive || hasFinished ? styles.inactiveArrows : "";

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setIsPaused(false);
		setTime(initialTime);
	}

	function changeTime(amount: number) {
		const clamp = (num: number, min: number, max: number) =>
			Math.min(Math.max(num, min), max);

		if (initialTime >= 5 * 60 && initialTime <= 60 * 60) {
			const newTime = clamp(initialTime + amount, 5 * 60, 60 * 60);
			setInitialTime(newTime);
			Cookies.set("preferredInitialTime", String(newTime), {
				expires: 365 * 20,
			});
		}
	}

	function togglePause() {
		setIsPaused(!isPaused);
	}

	useEffect(() => {
		if (isActive && time > 0 && !isPaused) {
			countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);

			// start challenge
			startNewChallenge();
		} else if (isPaused) {
			clearTimeout(countdownTimeout);
		}
	}, [isActive, time, isPaused]);

	useEffect(() => {
		setTime(initialTime);
	}, [initialTime]);

	useEffect(() => {
		if (!activeChallenge) {
			resetCountdown();
			setHasFinished(false);
		}
	}, [activeChallenge]);

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.clockContainer}>
					<div>
						<img
							src="icons/triangular-filled-up-arrow.svg"
							alt="Aumentar Minutos"
							className={`${styles.arrow} ${inactiveArrowsClass}`}
							onClick={() => changeTime(5 * 60)}
						/>
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

						<img
							src="icons/triangular-filled-up-arrow.svg"
							alt="Diminuir Minutos"
							className={`${styles.arrow} ${styles.downArrow} ${inactiveArrowsClass}`}
							onClick={() => changeTime(-5 * 60)}
						/>
					</div>

					<span>:</span>

					<div>
						<img
							src="icons/triangular-filled-up-arrow.svg"
							alt="Aumentar Segundos"
							className={`${styles.arrow} ${inactiveArrowsClass}`}
							onClick={() => changeTime(5)}
						/>

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

						<img
							src="icons/triangular-filled-up-arrow.svg"
							alt="Diminuir Segundos"
							className={`${styles.arrow} ${styles.downArrow} ${inactiveArrowsClass}`}
							onClick={() => changeTime(-5)}
						/>
					</div>
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
						<div className={styles.cycleInProgressContainer}>
							<Button
								className={`${styles.cycleButton} ${styles.cycleButtonActive}`}
								onClick={resetCountdown}
							>
								Abandonar ciclo
							</Button>

							<Button
								className={`${styles.cycleButton} ${styles.pauseCycle}`}
								onClick={togglePause}
							>
								{isPaused ? "Retomar Ciclo" : "Pausar Ciclo"}
							</Button>
						</div>
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
