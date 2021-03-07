import { useContext, useEffect } from "react";

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
import Cookies from "js-cookie";

interface HomeProps {
	level: number;
	xp: number;
	challenges: number;
	userName: string;
	userImg: string;
}

export default function Home(props: HomeProps) {
	const {
		isLvlUpModalActive,
		isLoggedIn,
		setIsLoggedIn,
		checkIfUserIsLogged,
	} = useContext(ChallengesContext);

	getMainCookies(props);

	useEffect(() => {
		checkIfUserIsLogged();
	}, []);

	function handleLogout() {
		// remove cookies
		Cookies.remove("userName");
		Cookies.remove("userImg");

		setIsLoggedIn(false);

		// refresh page
		window.location.reload();
	}

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

					{isLoggedIn ? (
						<button className={styles.logoutLink} onClick={handleLogout}>
							Log out
						</button>
					) : (
						<Link href="/login">
							<button className={styles.loginLink}>Log in</button>
						</Link>
					)}
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
