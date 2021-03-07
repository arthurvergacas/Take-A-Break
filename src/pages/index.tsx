import { useContext } from "react";

import { Profile } from "../components/Profile";
import { ExperienceBar } from "./../components/ExperienceBar";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";

import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import { LevelUpModal } from "../components/LevelUpModal";
import { Menu } from "../components/Menu";
import { getMainCookies } from "../utils/GetCookies";

interface HomeProps {
	level: number;
	xp: number;
	challenges: number;
	userName: string;
	userImg: string;
}

export default function Home(props: HomeProps) {
	const { isLvlUpModalActive } = useContext(ChallengesContext);

	getMainCookies(props);

	return (
		<Menu>
			<div className={styles.container}>
				{/* modal shown when leveling up */}
				{isLvlUpModalActive && <LevelUpModal />}

				<Head>
					<title>Início | Take A Break</title>
				</Head>

				<header>
					<ExperienceBar />

					<Link href="/login">
						<a className={styles.loginLink}>Log in</a>
					</Link>
				</header>

				<section>
					{/* div esquerda */}
					<div>
						<Profile userName={props.userName} userImg={props.userImg} />
						<CompletedChallenges />
						<Countdown />
					</div>
					{/* div direita */}
					<div>
						<ChallengeBox />
					</div>
				</section>
			</div>
		</Menu>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, xp, challenges, userName, userImg } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			xp: Number(xp),
			challenges: Number(challenges),
			userName: userName ?? "Máquina de Vencer",
			userImg: userImg ?? "img/home-office.jpg",
		},
	};
};
