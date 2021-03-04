import { useEffect, useRef } from "react";
import styles from "../styles/pages/Login.module.css";

export default function Login() {
	function handleGoogleOauth() {
		const googleOauthEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		const form = document.createElement("form");
		form.setAttribute("method", "GET"); // Send as a GET request.
		form.setAttribute("action", googleOauthEndpoint);

		// Parameters to pass to OAuth 2.0 endpoint.
		const params = {
			client_id: process.env.GOOGLE_CLIENT_ID,
			redirect_uri: "http://localhost:3000/login",
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
	}

	useEffect(() => {
		// when the user arrives at the page, check if he has a token. if so, set his profile and proceed to the main page
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				{/* TODO: create a component starting here to do all the oauth logic */}
				<button onClick={handleGoogleOauth}>Entre com o Google</button>
			</div>
		</div>
	);
}
