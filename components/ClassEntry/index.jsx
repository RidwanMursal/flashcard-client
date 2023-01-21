import React from "react";
import defaultPicture from "../../../book.png";
import styles from "./ClassEntry.module.css";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import { deleteClass } from "../../api/deleteRequests";
import Modal from "../Modal";
import { BASEURL } from "../../constants";
import { DELETE_ClASS_TITLE, DELETE_MESSAGE } from "../../modalMessages";

const callDeleteClass = async ({ contentID, contentSetter, modalSetter }) => {
  const response = await deleteClass(contentID);
  console.log("IN DELETE CLASS IN CLASS ENTRY, THE RESPONSE IS", response);
  if (response.status === 200) {
    contentSetter((prev) => prev.filter((class_) => class_.id !== contentID));
    alert("it worked");
    modalSetter(false);
  }
};

const closeModal = ({ modalSetter }) => {
  modalSetter(false);
};

const ClassEntry = ({
  name,
  collapsed,
  username,
  classID,
  setClasses,
  classPicture,
}) => {
  const router = useRouter();
  const selected = router.query.class_ == classID;
  const [deleteClassModal, setDeleteClassModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const entryRef = useRef(null);
  console.log("PICTURE FOR CLASS IN ICONS", classPicture);

  useEffect(() => {
    if (selected) entryRef.current.scrollIntoView();
  }, []);

  return (
    <div
      ref={entryRef}
      // className={
      //   selected & !collapsed || hovered & !collapsed
      //     ? `${styles.class_container} ${styles.selected}`
      //     : styles.class_container
      // }
      className={styles.class_container}
      data-selected={selected ? "true" : null}
      data-hover={hovered ? "true" : null}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Link className={styles.link} href={`/dashboard/${username}/${classID}`}>
        <img
          src={
            classPicture
              ? `${BASEURL}/static/${classPicture}`
              : defaultPicture.src
          }
          alt=""
          className={
            collapsed && selected
              ? `${styles.class_icon} ${styles.selected_collapsed}`
              : styles.class_icon
          }
        />
        <p className={collapsed ? styles.hidden : styles.class_name}>{name}</p>
      </Link>
      <AiOutlineClose
        class={hovered && !collapsed ? styles.delete_button : styles.hidden}
        onClick={() => setDeleteClassModal(true)}
      />
      <Modal
        contentSetter={setClasses}
        openModal={deleteClassModal}
        modalSetter={setDeleteClassModal}
        contentID={classID}
        title={DELETE_ClASS_TITLE}
        message={DELETE_MESSAGE}
        noInput={true}
        buttons={[
          { text: "No, Go Back!", onClick: closeModal },
          { text: "Yes, Delete.", onClick: callDeleteClass },
        ]}
      />
    </div>
  );
};

export default ClassEntry;
