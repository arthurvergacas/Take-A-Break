import Head from "next/head";
import { ChallengesProvider } from "../contexts/ChallengesContexts";

import "../styles/global.css";
import "../styles/menuStyles.css";

function TakeABreak({ Component, pageProps }) {
	return (
		<ChallengesProvider>
			<Head>
				<link rel="shortcut icon" href="favicons/favicon.ico" />
				<link
					rel="icon"
					sizes="16x16 32x32 64x64"
					href="favicons/favicon.ico"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="196x196"
					href="favicons/favicon-192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="160x160"
					href="favicons/favicon-160.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="favicons/favicon-96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="64x64"
					href="favicons/favicon-64.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="favicons/favicon-32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="favicons/favicon-16.png"
				/>
				<link rel="apple-touch-icon" href="favicons/favicon-57.png" />
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="favicons/favicon-114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="favicons/favicon-72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="favicons/favicon-144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="favicons/favicon-60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="favicons/favicon-120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="favicons/favicon-76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="favicons/favicon-152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="favicons/favicon-180.png"
				/>
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta
					name="msapplication-TileImage"
					content="favicons/favicon-144.png"
				/>
				<meta
					name="msapplication-config"
					content="favicons/browserconfig.xml"
				/>

				<meta property="og:url" content={window.location.href} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Take A Break" />
				<meta name="twitter:card" content="summary" />
				<meta property="og:description" content="Home Office com mais saúde" />
				<meta property="og:image" content="favicons/favicon-310.png" />
			</Head>

			<Component {...pageProps} />
		</ChallengesProvider>
	);
}

export default TakeABreak;
