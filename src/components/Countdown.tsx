import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Countdown.module.css";
import { Button } from "./Button";

import { useDidUpdateEffect } from "../utils/CustomHooks";

import Cookies from "js-cookie";

interface CountdownProps {
	isCurrentlyActive: boolean;
	currentEndTime: number;
	firstInitialTime: number;
	isCurrentlyPaused: boolean;
	currentTimeRemaining: number;
}

export function Countdown(props: CountdownProps) {
	const {
		startNewChallenge,
		activeChallenge,
		initialTime,
		setInitialTime,
	} = useContext(ChallengesContext);

	const [time, setTime] = useState(props.firstInitialTime); // time in seconds
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000) + time);

	const minutes = (time / 60) | 0; // bitwise way to round numbers (top tier)
	const seconds = time % 60;

	const inactiveUpArrowsClass =
		isActive || hasFinished || initialTime === 60 * 60
			? styles.inactiveArrows
			: "";

	const inactiveBottomArrowsClass =
		isActive || hasFinished || initialTime === 5 * 60
			? styles.inactiveArrows
			: "";

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

		Cookies.set("isCurrentlyPaused", String(false), {
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

		Cookies.set("isCurrentlyPaused", String(false), {
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

		if (isPaused) {
			setEndTime(newEndTime);
		}

		Cookies.set("currentEndTime", String(newEndTime), {
			expires: 365 * 20,
		});

		Cookies.set("currentTimeRemaining", String(time), {
			expires: 365 * 20,
		});

		setIsPaused(!isPaused);
		Cookies.set("isCurrentlyPaused", String(!isPaused), {
			expires: 365 * 20,
		});
	}

	useEffect(() => {
		if (props.isCurrentlyActive) {
			const clamp = (num: number, min: number, max: number) =>
				Math.min(Math.max(num, min), max);

			const updatedTime = props.currentEndTime - Math.floor(Date.now() / 1000);

			if (updatedTime <= 0) {
				setHasFinished(true);
				startNewChallenge();
				setIsActive(false);

				Cookies.set("isCurrentlyPaused", String(false), {
					expires: 365 * 20,
				});

				// HACK Timeout to wait the page render the initial time and then update the timer
				setTimeout(() => setTime(clamp(updatedTime, 0, Infinity)), 1);
			} else if (props.isCurrentlyPaused) {
				const newEndTimePaused =
					Math.floor(Date.now() / 1000) + props.currentTimeRemaining;
				// HACK Timeout to wait the page render the initial time and then update the timer
				setTimeout(
					() => setTime(clamp(props.currentTimeRemaining, 0, Infinity)),
					1
				);

				setIsActive(true);
				setEndTime(newEndTimePaused);
				setIsPaused(props.isCurrentlyPaused);
			} else {
				setIsActive(true);
				setEndTime(props.currentEndTime);

				// HACK Timeout to wait the page render the initial time and then update the timer
				setTimeout(() => setTime(clamp(updatedTime, 0, Infinity)), 1);
			}
		}
	}, []);

	useEffect(() => {
		if (isActive && time > 0 && !isPaused) {
			countdownTimeout = setTimeout(() => {
				const newTime = endTime - Math.floor(Date.now() / 1000);

				setTime(newTime);
			}, 1000);
		} else if (isActive && time <= 0) {
			setTime(0);
			setHasFinished(true);
			setIsActive(false);

			Cookies.set("isCurrentlyActive", String(false), {
				expires: 365 * 20,
			});
			Cookies.set("isCurrentlyPaused", String(false), {
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
							className={`${styles.arrow} ${inactiveUpArrowsClass}`}
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
							className={`${styles.arrow} ${styles.downArrow} ${inactiveBottomArrowsClass}`}
							onClick={() => changeTime(-5 * 60)}
						/>
					</div>

					<span>:</span>

					<div>
						<img
							src="icons/triangular-filled-up-arrow.svg"
							alt="Aumentar Segundos"
							className={`${styles.arrow} ${inactiveUpArrowsClass}`}
							onClick={() => changeTime(10)}
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
							className={`${styles.arrow} ${styles.downArrow} ${inactiveBottomArrowsClass}`}
							onClick={() => changeTime(-10)}
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
