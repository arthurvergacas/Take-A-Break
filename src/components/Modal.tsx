import { ReactNode, useEffect, useState } from "react";
import { Transition } from "react-transition-group";

import styles from "../styles/components/Modal.module.css";

interface ModalProps {
  children: ReactNode;
  disableFunction: () => void;
  inProp?: boolean;
}

export function Modal(props: ModalProps) {
  const [inProp, setInProp] = useState(false);

  const overlayTransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const modalTransitionStyles = {
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

  useEffect(() => {
    if (props.inProp == false) {
      setInProp(false);
    }
  }, [props.inProp]);

  function handleModalExit() {
    setInProp(false);
  }

  function actuallyDisableModal() {
    // disable modal using the function in context
    props.disableFunction();
  }

  return (
    <Transition in={inProp} timeout={duration} onExited={actuallyDisableModal}>
      {(state) => (
        <div
          className={styles.overlay}
          style={{ ...overlayTransitionStyles[state], ...transitionStyle }}
        >
          <div
            className={styles.container}
            style={{ ...modalTransitionStyles[state], ...transitionStyle }}
          >
            {props.children}
            <button type="button" className={styles.exitBtn}>
              <img
                src="icons/close.svg"
                alt="Fechar Modal"
                onClick={handleModalExit}
              />
            </button>
          </div>
        </div>
      )}
    </Transition>
  );
}
