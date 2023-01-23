import { deleteClass } from "../../api/deleteRequests";

export const callDeleteClass = async ({
  contentID,
  contentSetter,
  modalSetter,
  setDisplayToast,
}) => {
  const response = await deleteClass(contentID);
  console.log("IN DELETE CLASS IN CLASS ENTRY, THE RESPONSE IS", response);
  if (response.status === 200) {
    contentSetter((prev) => prev.filter((class_) => class_.id !== contentID));
    // alert("it worked");
    modalSetter(false);
    setDisplayToast(false);
  }
};
