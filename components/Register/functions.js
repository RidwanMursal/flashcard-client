import { register } from "../../api/authRequests";

export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const submit = async (data, router, setErrorMessage) => {
  // send  request
  const response = await register(data);
  // if status is 200, redirect to login
  if (response.status === 200) {
    router.push("/login");
  } else if (response.status === 409) {
    setErrorMessage("Username is taken already, please pick another one. ");
  } else {
    setErrorMessage("Internal server error, please try again later.");
  }
  // else add error messages
  console.log(response);
  return;
};
