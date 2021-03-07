import { createContext, ReactNode, useEffect, useState } from "react";

import Cookies from "js-cookie";

import challenges from "../challenges.json";

interface Challenge {
	type: "body" | "eyes";
	text: string;
	xp: number;
}

interface ChallengesProviderProps {
	children: ReactNode;
}

interface ChallengesContextData {
	maxXp: number;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	activeChallenge: Challenge;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
	onChallengeCompleted: () => void;
	initialTime: number;
	setLevel: Function;
	setCurrentExperience: Function;
	setChallengesCompleted: Function;
	isLvlUpModalActive: boolean;
	isLoggedIn: boolean;
	disableLvlUpModal: () => void;
	checkIfUserIsLogged: () => void;
	setIsLoggedIn: Function;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [initialTime, setInitialTime] = useState(1); // in seconds
	const [isLvlUpModalActive, setIsLvlUpModalActive] = useState(false);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const maxXp = Math.pow((level + 1) * 5, 2);

	// ask for notification permission
	useEffect(() => {
		Notification.requestPermission();
	}, []);

	// store user data
	useEffect(() => {
		// store information in cookies if user is not logged in
		// TODO: add if statement to check if user is logged in.
		//			 if not, store information with cookies, otherwise, store in db
		Cookies.set("level", String(level), { expires: 365 * 20 });
		Cookies.set("xp", String(currentExperience), { expires: 365 * 20 });
		Cookies.set("challenges", String(challengesCompleted), {
			expires: 365 * 20,
		});
		// store information on supabase. => how? need to serch
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
		enableLvlUpModal();
	}

	function enableLvlUpModal() {
		setIsLvlUpModalActive(true);
	}

	function disableLvlUpModal() {
		setIsLvlUpModalActive(false);
	}

	function onChallengeCompleted() {
		if (!activeChallenge) return;

		let finalXp = currentExperience + activeChallenge.xp;

		if (finalXp >= maxXp) {
			levelUp();
			finalXp = (currentExperience + activeChallenge.xp) % maxXp;
		}

		setChallengesCompleted(challengesCompleted + 1);
		setCurrentExperience(finalXp);
		setActiveChallenge(null);
	}

	function startNewChallenge() {
		const index = (Math.random() * challenges.length) | 0;

		const challenge = challenges[index];

		setActiveChallenge(challenge);

		// send notification to user
		if (Notification.permission === "granted") {
			new Notification("Novo desafio! 🏃‍♂️", {
				body: `Valendo ${challenge.xp} xp!`,
				// silent: true, // use this if you are developing it and tired of hearing the notification
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function checkIfUserIsLogged() {
		if (Cookies.get("userName") && Cookies.get("userImg")) {
			setIsLoggedIn(true);
		}
	}

	const data = {
		maxXp,
		level,
		levelUp,
		currentExperience,
		challengesCompleted,
		startNewChallenge,
		activeChallenge,
		resetChallenge,
		onChallengeCompleted,
		initialTime,
		setLevel,
		setCurrentExperience,
		setChallengesCompleted,
		isLvlUpModalActive,
		disableLvlUpModal,
		isLoggedIn,
		checkIfUserIsLogged,
		setIsLoggedIn,
	};

	return (
		<ChallengesContext.Provider value={data}>
			{children}
		</ChallengesContext.Provider>
	);
}
