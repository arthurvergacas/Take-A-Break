import React, { useContext, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import { Modal } from "./Modal";

import Slider from "@material-ui/core/Slider";

import Cookies from "js-cookie";

import styles from "../styles/components/SetTimerModal.module.css";
import { withStyles } from "@material-ui/core/styles";

export function SetTimerModal() {
	const { disableSetTimerModal, initialTime, setInitialTime } = useContext(
		ChallengesContext
	);

	const [inProp, setInProp] = useState(true);

	let newTime = initialTime;

	function valuetext(value: number) {
		newTime = value * 60;

		return `${value.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		})}:00`;
	}

	function saveChanges() {
		setInitialTime(newTime);

		Cookies.set("preferredInitialTime", String(newTime), { expires: 365 * 20 });

		setInProp(false);
	}

	const CustomSlider = withStyles({
		root: {
			color: "var(--green)",
			height: 3,
		},
		thumb: {
			height: 12,
			width: 12,
			"&:focus, &:hover, &$active": {
				boxShadow: "inherit",
			},
		},
		valueLabel: {
			fontSize: "0.9rem",
			filter: "brightness(1.05)",
			"& *": {
				background: "var(--green)",
				color: "var(--title)",
			},
		},
		track: {
			height: 3,
			borderRadius: 4,
		},
		rail: {
			height: 3,
			borderRadius: 2,
		},
	})(Slider);

	return (
		<Modal disableFunction={disableSetTimerModal} inProp={inProp}>
			<strong className={styles.title}>Defina a duração do timer</strong>

			<div className={styles.sliderContainer}>
				<CustomSlider
					defaultValue={initialTime / 60}
					getAriaValueText={valuetext}
					aria-labelledby="discrete-slider"
					valueLabelDisplay="auto"
					step={5}
					marks
					min={5}
					max={60}
				/>
			</div>

			<button className={styles.saveBtn} onClick={saveChanges}>
				Salvar
			</button>
		</Modal>
	);
}
