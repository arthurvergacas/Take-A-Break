import { useContext, useEffect } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";

export function getMainCookies(props) {
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
}
