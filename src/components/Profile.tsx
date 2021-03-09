import { useContext, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/Profile.module.css";

interface ProfileProps {
	userName: string;
	userImg: string;
}

export function Profile(props: ProfileProps) {
	const { level, enableEditProfileModal, isLoggedIn } = useContext(
		ChallengesContext
	);

	const [editButtonInactiveClass, setEditButtonInactiveClass] = useState({
		display: "none",
	});

	function mouseEnterProfileHandler() {
		setEditButtonInactiveClass({ display: "inherit" });
	}

	function mouseLeaveProfileHandler() {
		setEditButtonInactiveClass({ display: "none" });
	}

	function onEditButtonClick() {
		enableEditProfileModal();
	}

	return (
		<div
			className={styles.profileContainer}
			onMouseEnter={mouseEnterProfileHandler}
			onMouseLeave={mouseLeaveProfileHandler}
		>
			<img src={props.userImg} alt="Imagem do Perfil" />
			<div>
				<div className={styles.nameContainer}>
					<strong>{props.userName}</strong>
					{!isLoggedIn && (
						<img
							src="icons/edit-button.svg"
							alt="Editar Nome"
							style={editButtonInactiveClass}
							onClick={onEditButtonClick}
						/>
					)}
				</div>
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
