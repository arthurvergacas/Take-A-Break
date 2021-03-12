import Head from "next/head";
import { Menu } from "../components/Menu";
import styles from "../styles/pages/About.module.css";

export default function About() {
	return (
		<>
			<Head>
				<title>Sobre | Take A Break</title>
			</Head>

			<Menu>
				<div className={styles.container}>
					<img src="img/chronometer.png" alt="Take A Break" />

					<div className={styles.textContainer}>
						<strong>Obrigado por usar o Take A Break!</strong>

						<p>
							Aplicação desenvolvida durante a{" "}
							<a href="https://nextlevelweek.com/">Next Level Week</a>,
							oferecida pela <a href="https://rocketseat.com.br/">Rocketseat</a>
							<br />
							Ícones disponibilizados por{" "}
							<a href="https://www.flaticon.com/">Flaticon</a>
							<br />
							<br />© 2021 - 2021{" "}
							<a href="https://github.com/arthurvergacas">Arthur Vergaças</a>
						</p>
					</div>
				</div>
			</Menu>
		</>
	);
}
