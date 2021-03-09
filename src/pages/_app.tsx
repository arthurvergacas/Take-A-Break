import { ChallengesProvider } from "../contexts/ChallengesContexts";

import "../styles/global.css";
import "../styles/menuStyles.css";

function TakeABreak({ Component, pageProps }) {
	return (
		<ChallengesProvider>
			<Component {...pageProps} />
		</ChallengesProvider>
	);
}

export default TakeABreak;
