import React, { useContext } from "react";

import { Profile } from "../components/Profile";
import { ExperienceBar } from "./../components/ExperienceBar";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";

import Head from "next/head";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import { LevelUpModal } from "../components/LevelUpModal";

export default function Home() {
	const { isLvlUpModalActive } = useContext(ChallengesContext);

	return (
		<div className={styles.container}>
			{/* modal shown when leveling up */}
			{isLvlUpModalActive && <LevelUpModal />}

			<Head>
				<title>Início | move.it</title>
			</Head>

			<ExperienceBar />

			<section>
				{/* div esquerda */}
				<div>
					<Profile />
					<CompletedChallenges />
					<Countdown />
				</div>
				{/* div direita */}
				<div>
					<ChallengeBox />
				</div>
			</section>
		</div>
	);
}