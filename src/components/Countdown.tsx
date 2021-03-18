import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";
import { Button } from "./Button";

import { useDidUpdateEffect } from "../custom-hooks/useDidUpdateEffect";

import Cookies from "js-cookie";

interface CountdownProps {
	isCurrentlyActive: boolean;
	currentEndTime: number;
}

export function Countdown(props: CountdownProps) {
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
	const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000) + time);

	const minutes = (time / 60) | 0; // bitwise way to round numbers (top tier)
	const seconds = time % 60;

	const inactiveArrowsClass =
		isActive || hasFinished ? styles.inactiveArrows : "";

	let countdownTimeout: NodeJS.Timeout;

	function startCountdown() {
		const newEndTime = Math.floor(Date.now() / 1000) + time;
		setEndTime(newEndTime);
		setIsActive(true);

		Cookies.set("currentEndTime", String(newEndTime), {
			expires: 365 * 20,
		});

		Cookies.set("isCurrentlyActive", String(true), {
			expires: 365 * 20,
		});
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setIsPaused(false);

		Cookies.set("isCurrentlyActive", String(false), {
			expires: 365 * 20,
		});

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
		clearTimeout(countdownTimeout);

		const newEndTime = Math.floor(Date.now() / 1000) + time;
		setEndTime(newEndTime);

		setIsPaused(!isPaused);
	}

	// BUG When the page reloads, the initial time is still displayed for 1 second,
	// even though this is not the real current time

	// BUG When the timer ends while the user is in another tab, the final timer is displayed as the initial time
	useEffect(() => {
		if (props.isCurrentlyActive) {
			const newTime = props.currentEndTime - Math.floor(Date.now() / 1000);
			if (newTime <= 0) {
				setHasFinished(true);
				startNewChallenge();
			} else {
				setIsActive(true);
				setEndTime(props.currentEndTime);
			}
		}
	}, []);

	useEffect(() => {
		if (isActive && time > 0 && !isPaused) {
			countdownTimeout = setTimeout(() => {
				const newTime = endTime - Math.floor(Date.now() / 1000);

				setTime(newTime);
			}, 1000);
		} else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);

			Cookies.set("isCurrentlyActive", String(false), {
				expires: 365 * 20,
			});

			// start challenge
			startNewChallenge();
		}
	}, [isActive, time, isPaused]);

	useEffect(() => {
		setTime(initialTime);
	}, [initialTime]);

	useDidUpdateEffect(() => {
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
