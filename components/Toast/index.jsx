import styles from "./Toast.module.css";
import { useEffect } from "react";

const Toast = ({ show, setShow, message }) => {
  useEffect(() => {
    if (show === true) setTimeout(() => setShow(false), 5000);
  }, [show]);

  return (
    <div>
      <div className={show ? `${styles.show} ${styles.toast}` : styles.toast}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
