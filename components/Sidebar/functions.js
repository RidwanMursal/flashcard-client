import { postClass } from "../../api/postRequests";

export const addClass = async ({
  username,
  data,
  contentSetter,
  setInputValue,
  modalSetter,
  setDisplayToast,
}) => {
  console.log("this is the user", username);
  const response = await postClass(username, data);
  console.log("IN SIDEBAR ADD CLASS, THIS WAS THE RESPONSE", response.data);
  if (response.status === 200) {
    contentSetter((prev) => [...prev, response.data[0]]);
    setInputValue("");
    modalSetter(false);
    setDisplayToast(true);
  }
  return;
};
