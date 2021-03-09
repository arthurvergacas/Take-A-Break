import React, {
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

import { Transition } from "react-transition-group";
import { CustomTooltip } from "../components/CustomTooltip";

import { ChallengesContext } from "../contexts/ChallengesContexts";
import styles from "../styles/components/EditProfileModal.module.css";
import { ConditionalWrapper } from "./ConditionalWrapper";

export function EditProfileModal() {
	const { disableEditProfileModal, changeProfile } = useContext(
		ChallengesContext
	);

	const [newPicture, setNewPicture] = useState("");
	const [newName, setNewName] = useState("");

	const [inProp, setInProp] = useState(false);

	const overlayTransitionStyles = {
		entering: { opacity: 1 },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0 },
	};

	const modalTransitionStyles = {
		entering: { transform: "scale(1)" },
		entered: { transform: "scale(1)" },
		exiting: { transform: "scale(1.1)" },
		exited: { transform: "scale(0)" },
	};

	const duration = 250;
	const transitionStyle = {
		transition: `all ${duration}ms ease-in-out`,
	};

	useEffect(() => {
		setInProp(true);
	}, []);

	function handleModalExit() {
		setInProp(false);
	}

	function actuallyDisableModal() {
		disableEditProfileModal();
	}

	function saveChanges() {
		changeProfile(newName, newPicture);
		setInProp(false);

		window.location.reload();
	}

	return (
		<Transition in={inProp} timeout={duration} onExited={actuallyDisableModal}>
			{(state) => (
				<div
					className={styles.overlay}
					style={{
						...overlayTransitionStyles[state],
						...transitionStyle,
					}}
				>
					<div
						className={styles.container}
						style={{
							...modalTransitionStyles[state],
							...transitionStyle,
						}}
					>
						<button type="button">
							<img
								src="icons/close.svg"
								alt="Fechar Modal"
								onClick={handleModalExit}
							/>
						</button>

						<header>Editar perfil</header>

						<ConditionalWrapper
							condition={state == "entered"}
							wrapper={(children: ReactElement<any, any>) => (
								// BUG Tooltip mess up with modal's entering animation.
								// 			Only happens when user makes the tooltip appear (hovers over the div)
								<CustomTooltip
									title={`Desculpe, mas essa funcionalidade ainda não está disponível. 😟
													Se deseja uma foto de perfil personalizada, faça o Log In com o Google! 🙂`}
									placement="right"
								>
									{children}
								</CustomTooltip>
							)}
						>
							<div className={styles.wrapper}>
								<div className={styles.notAvailableOverlay} />
								<div className={styles.pictureContainer}>
									<strong>Escolha sua foto de perfil</strong>
									<img
										src="img/no-profile-picture.png"
										alt="Nova foto de perfil"
									/>
								</div>
							</div>
						</ConditionalWrapper>

						<div className={styles.nameContainer}>
							<strong>Escolha seu nome</strong>
							<input
								type="text"
								onChange={(event) => setNewName(event.target.value)}
							/>
						</div>

						<button onClick={saveChanges}>Salvar</button>
					</div>
				</div>
			)}
		</Transition>
	);
}
