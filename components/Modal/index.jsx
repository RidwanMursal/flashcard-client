import styles from "./Modal.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/authContext";

const Modal = ({
  title,
  message,
  username,
  buttons,
  openModal,
  modalSetter,
  contentSetter,
  contentID,
  noInput,
  imageInput,
}) => {
  const [inputValue, setInputValue] = useState("");
  const data = { className: inputValue };
  const router = useRouter();
  const args = {
    username,
    modalSetter,
    contentSetter,
    data,
    contentID,
    router,
    setInputValue,
  };

  console.log("THE CONTENT ID IS", contentID);
  console.log("MODAL SETTER IS", modalSetter);
  console.log("BUTTONS ARE", buttons);

  return (
    <div className={openModal ? styles.container : styles.hidden}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <input
          className={noInput ? styles.hidden : styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {buttons.map((button) => (
          <button
            className={styles.button}
            onClick={() => button.onClick(args)}
          >
            {button.text}
          </button>
        ))}
      </div>
      <div className={styles.backdrop} onClick={() => modalSetter(false)}></div>
    </div>
  );
};

export default Modal;
