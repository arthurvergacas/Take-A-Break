import { useEffect, useState } from "react";

import { GetServerSideProps } from "next";

import axios from "axios";
import Cookies from "js-cookie";

import { getMainCookies } from "../utils/GetCookies";

import styles from "../styles/pages/Login.module.css";

import CircularProgress from "@material-ui/core/CircularProgress";

import Head from "next/head";
import Router from "next/router";

interface GoogleOAuthResponse {
	name: string;
	picture: string;
}

export default function Login(props) {
	const [isLoading, setIsLoading] = useState(false);

	function startOAuthFlow() {
		const googleOauthEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		const form = document.createElement("form");
		form.setAttribute("method", "GET"); // Send as a GET request.
		form.setAttribute("action", googleOauthEndpoint);

		// Parameters to pass to OAuth 2.0 endpoint.
		const params = {
			client_id: process.env.GOOGLE_CLIENT_ID,
			redirect_uri: window.location.href,
			response_type: "token",
			scope: "https://www.googleapis.com/auth/userinfo.profile",
			state: "pass-through",
		};

		// Add form parameters as hidden input values.
		for (const p in params) {
			const input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", p);
			input.setAttribute("value", params[p]);
			form.appendChild(input);
		}

		// Add form to page and submit it to open the OAuth 2.0 endpoint.
		document.body.appendChild(form);
		form.submit();

		form.remove();
	}

	async function makeOAuth2Request(): Promise<GoogleOAuthResponse> {
		const userProfileURI = "https://www.googleapis.com/oauth2/v2/userinfo";

		const paramsList = window.location.hash.substr(1).split("&");

		interface ParamsObject {
			state: string;
			access_token: string;
			token_type: string;
			expires_in: string;
			scope: string;
		}

		const paramsObject: ParamsObject = Object.fromEntries(
			paramsList.map((value) => value.split("="))
		);

		const response = await axios.get(userProfileURI, {
			params: { access_token: paramsObject.access_token },
		});
		return response.data;
	}

	// cookies from level and etc
	getMainCookies(props);

	useEffect(() => {
		// when the user arrives at the page, check if he has a token.
		// if he has, do the following:
		//  - add loading while fetching user data
		//  - fetch user data
		//	- set a state saying that the user is logged in
		//  - get the info and set the profile name and photo in the cookies
		//  - store the user in the db if he is not already
		// 	- redirect to main page
		async function handleLogin() {
			if (window.location.hash) {
				//  - add loading while fetching user data
				setIsLoading(true);

				//  - fetch user data
				const userData = await makeOAuth2Request();

				//  - get the info and set the profile name and photo in the cookies
				Cookies.set("userName", String(userData.name), { expires: 365 * 20 });
				Cookies.set("userImg", String(userData.picture), { expires: 365 * 20 });

				//  TODO - store the user in the db if he is not already

				// 	- redirect to main page
				Router.push("/");
			}
		}

		handleLogin();
	}, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Login | Take A Break</title>
			</Head>

			<div className={styles.loginBox}>
				{isLoading ? (
					<>
						<strong className={styles.loadingMsg}>Entrando</strong>
						<CircularProgress color="inherit" />
					</>
				) : (
					/* TODO: create a component to do all the oauth logic */
					<button onClick={startOAuthFlow}>Entre com o Google</button>
				)}
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { level, xp, challenges } = ctx.req.cookies;

	return {
		props: {
			level: Number(level),
			xp: Number(xp),
			challenges: Number(challenges),
		},
	};
};
