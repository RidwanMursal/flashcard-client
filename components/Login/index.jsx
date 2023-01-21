import styles from "./Login.module.css";
import Link from "next/link";
import { useStateContext } from "../../context/authContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../../api/authRequests";

const submitLogin = async (data, setErrorFlag, router, setUser) => {
  // send  request
  console.log("THE DATA IS: ", data);
  const response = await login(data);
  // if status is 200, redirect to login
  if (response.status === 200) {
    setErrorFlag(false);
    // localStorage.setItem("token", response.data.accessToken)
    // localStorage.setItem("username", data.username)
    console.log(response);
    setUser({
      username: data.username,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });
    router.push(`/dashboard/${data.username}`);
  } else {
    setErrorFlag(true);
  }
  console.log(response);
  return;
};

const LoginComponent = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data = { username: username, password: password };
  const [errorFlag, setErrorFlag] = useState(false);
  const { setUser } = useStateContext();

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <label
          className={styles.label}
          data-error={errorFlag ? "error" : null}
          htmlFor="username"
        >
          username
        </label>
        <input
          className={styles.input}
          data-error={errorFlag ? "error" : null}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className={errorFlag ? styles.p : styles.hidden}>
          Username or password entered is incorrect. Please try again.
        </p>
        <label
          className={styles.label}
          data-error={errorFlag ? "error" : null}
          htmlFor="password"
        >
          password
        </label>
        <input
          className={styles.input}
          data-error={errorFlag ? "error" : null}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={errorFlag ? styles.p : styles.hidden}>
          Username or password entered is incorrect. Please try again.
        </p>
        <button
          className={styles.login_button}
          onClick={() => submitLogin(data, setErrorFlag, router, setUser)}
        >
          Login
        </button>
        <p>
          Don&apos;t have an account?
          <Link href="/register">Click here</Link>
          To register
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
