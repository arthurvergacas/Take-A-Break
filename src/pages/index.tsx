import { useContext } from "react";

import { Profile } from "../components/Profile";
import { ExperienceBar } from "./../components/ExperienceBar";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";

import Head from "next/head";
import Link from "next/link";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import { LevelUpModal } from "../components/LevelUpModal";
import { Menu } from "../components/Menu";

export default function Home() {
	const { isLvlUpModalActive } = useContext(ChallengesContext);

	return (
		<Menu>
			<div className={styles.container}>
				{/* modal shown when leveling up */}
				{isLvlUpModalActive && <LevelUpModal />}

				<Head>
					<title>Início | move.it</title>
				</Head>

				<header>
					<ExperienceBar />

					<div className={styles.loginContainer}>
						<Link href="/login">
							<a className={styles.loginLink}>Log in</a>
						</Link>
					</div>
				</header>

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
		</Menu>
	);
}
