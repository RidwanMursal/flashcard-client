import styles from "./Toast.module.css";
import { useState } from "react";
const Toast = ({ show, setShow, message }) => {
  const [showToast, setShowToast] = useState(false);
  setTimeout(() => setShow(false), 2000);
  return (
    <div>
      {/* <button onClick={() => setShowToast((prev) => !prev)}>Hey</button> */}
      <div className={show ? `${styles.show} ${styles.toast}` : styles.toast}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
