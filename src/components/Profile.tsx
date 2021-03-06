import { useContext, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Profile.module.css";

interface ProfileProps {
	userName: string;
	userImg: string;
}

export function Profile(props: ProfileProps) {
	const { level } = useContext(ChallengesContext);

	return (
		<div className={styles.profileContainer}>
			<img src={props.userImg} alt="Imagem do Perfil" />
			<div>
				<strong>{props.userName}</strong>
				<p>
					<img
						src="icons/up-arrow.svg"
						alt="Level"
						className={styles.levelArrow}
					/>
					Nível {level}
				</p>
			</div>
		</div>
	);
}
