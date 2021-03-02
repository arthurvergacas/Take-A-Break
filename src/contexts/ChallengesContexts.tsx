import { createContext, ReactNode, useState } from "react";

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
	onChallengeCompleted: (xp: number) => void;
	initialTime: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const [activeChallenge, setActiveChallenge] = useState(null);
	const [initialTime, setInitialTime] = useState(1); // in seconds

	const maxXp = Math.pow((level + 1) * 5, 2);

	function levelUp() {
		setLevel(level + 1);
	}

	function onChallengeCompleted(xp: number) {
		setChallengesCompleted(challengesCompleted + 1);
		setCurrentExperience(currentExperience + xp);

		if (currentExperience + xp >= maxXp) {
			levelUp();
			setCurrentExperience((currentExperience + xp) % maxXp);
		}

		setActiveChallenge(null);
	}

	function startNewChallenge() {
		const index = (Math.random() * challenges.length) | 0;

		setActiveChallenge(challenges[index]);
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
	};

	return (
		<ChallengesContext.Provider value={data}>
			{children}
		</ChallengesContext.Provider>
	);
}
