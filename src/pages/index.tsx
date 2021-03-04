import React, { useContext, useEffect } from "react";

import { Profile } from "../components/Profile";
import { ExperienceBar } from "./../components/ExperienceBar";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";

import Head from "next/head";
import { GetServerSideProps } from "next";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import { LevelUpModal } from "../components/LevelUpModal";

export default function Home(props) {
	const {
		setLevel,
		setCurrentExperience,
		setChallengesCompleted,
		level,
		currentExperience,
		challengesCompleted,
	} = useContext(ChallengesContext);

	// get cookies from next server
	// need to wrap it with use effect so react don't get confused with rendering and updating stuff at the same time
	useEffect(() => {
		setLevel(props.level ?? level);
		setCurrentExperience(props.xp ?? currentExperience);
		setChallengesCompleted(props.challenges ?? challengesCompleted);
	}, []);

	return (
		<div className={styles.container}>
			{/* modal shown when leveling up */}
			<LevelUpModal />

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, xp, challenges } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			xp: Number(xp),
			challenges: Number(challenges),
		},
	};
};
