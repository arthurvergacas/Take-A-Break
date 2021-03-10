import React, { useContext, useState } from "react";

import { CustomTooltip } from "../components/CustomTooltip";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/EditProfileModal.module.css";
import { Modal } from "./Modal";

export function EditProfileModal() {
	const { disableEditProfileModal, changeProfile } = useContext(
		ChallengesContext
	);

	const [newPicture, setNewPicture] = useState("");
	const [newName, setNewName] = useState("");

	const [inProp, setInProp] = useState(true);

	function saveChanges() {
		changeProfile(newName, newPicture);
		setInProp(false);

		if (newName != "") window.location.reload();
	}

	return (
		<Modal disableFunction={disableEditProfileModal} inProp={inProp}>
			<header className={styles.header}>Editar perfil</header>

			{/* BUG Tooltip mess up with modal's entering animation.
							Only happens when user makes the tooltip appear (hovers over the div) */}
			<CustomTooltip
				title={`Desculpe, mas essa funcionalidade ainda não está disponível. 😟
													Se deseja uma foto de perfil personalizada, faça o Log In com o Google! 🙂`}
				placement="right"
			>
				<div className={styles.wrapper}>
					<div className={styles.notAvailableOverlay} />
					<div className={styles.pictureContainer}>
						<strong>Escolha sua foto de perfil</strong>
						<img src="img/no-profile-picture.png" alt="Nova foto de perfil" />
					</div>
				</div>
			</CustomTooltip>

			<div className={styles.nameContainer}>
				<strong>Escolha seu nome</strong>
				<input
					type="text"
					onChange={(event) => setNewName(event.target.value)}
				/>
			</div>

			<button className={styles.saveBtn} onClick={saveChanges}>
				Salvar
			</button>
		</Modal>
	);
}
