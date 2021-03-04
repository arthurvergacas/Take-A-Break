import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
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
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [initialTime, setInitialTime] = useState(1); // in seconds

	const maxXp = Math.pow((level + 1) * 5, 2);

	useEffect(() => {
		// ask for notification permission
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		Cookies.set("level", String(level), { expires: 365 * 20 });
		Cookies.set("xp", String(currentExperience), { expires: 365 * 20 });
		Cookies.set("challenges", String(challengesCompleted), {
			expires: 365 * 20,
		});
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
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
	};

	return (
		<ChallengesContext.Provider value={data}>
			{children}
		</ChallengesContext.Provider>
	);
}
