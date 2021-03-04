import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";

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
	disableLvlUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [initialTime, setInitialTime] = useState(1); // in seconds
	const [isLvlUpModalActive, setIsLvlUpModalActive] = useState(false);

	const maxXp = Math.pow((level + 1) * 5, 2);

	useEffect(() => {
		// ask for notification permission
		Notification.requestPermission();
	}, []);

	useEffect(() => {
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
	};

	return (
		<ChallengesContext.Provider value={data}>
			{children}
		</ChallengesContext.Provider>
	);
}
