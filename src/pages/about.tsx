import Head from "next/head";
import styles from "../styles/pages/About.module.css";

export default function About() {
	return (
		<>
			<Head>
				<title>Sobre | Take A Break</title>
			</Head>

			<div className={styles.container}>
				<img src="img/chronometer.png" alt="Take A Break" />

				<div className={styles.textContainer}>
					<strong>Obrigado por usar o Take A Break!</strong>

					<p>
						Aplicação desenvolvida durante a{" "}
						<a
							href="https://nextlevelweek.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Next Level Week
						</a>
						, oferecida pela{" "}
						<a
							href="https://rocketseat.com.br/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Rocketseat
						</a>
						<br />
						Ícones disponibilizados por{" "}
						<a
							href="https://www.flaticon.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Flaticon
						</a>
						<br />
						<br />© 2021 - {new Date().getFullYear()}{" "}
						<a
							href="https://github.com/arthurvergacas"
							target="_blank"
							rel="noopener noreferrer"
						>
							Arthur Vergaças
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
