import { login } from "../../api/authRequests";

export const submitLogin = async (data, setErrorFlag, router, setUser) => {
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
