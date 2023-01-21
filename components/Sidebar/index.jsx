import React from "react";
import styles from "./Sidebar.module.css";
import Modal from "../Modal/index";
import ClassEntry from "../ClassEntry/index";
import defaultImage from "../../../book.png";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSkipBackward, BsSkipForward } from "react-icons/bs";
import {
  getClasses,
  getDecks,
  getDecksFromUsername,
} from "../../api/getRequests";
import { postClass } from "../../api/postRequests";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UploadModal from "../UploadModal";
import { BASEURL } from "../../constants";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Link from "next/link";
import {
  ADD_ClASS_MESSAGE,
  ADD_CLASS_TITLE,
  UPLOAD_IMAGE_MESSAGE,
  UPLOAD_TITLE,
} from "../../modalMessages";

const addClass = async ({
  username,
  data,
  contentSetter,
  setInputValue,
  modalSetter,
}) => {
  console.log("this is the user", username);
  const response = await postClass(username, data);
  console.log("IN SIDEBAR ADD CLASS, THIS WAS THE RESPONSE", response.data);
  if (response.status === 200) {
    contentSetter((prev) => [...prev, response.data[0]]);
    setInputValue("");
    modalSetter(false);
  }
  return;
};

const Sidebar = ({ width, username, profilePicture, currClass }) => {
  const router = useRouter();
  console.log("HELLO THIS IS THE PROFILE PICTURE", profilePicture);
  console.log("HELLO THIS IS THE USER NAME", profilePicture);

  const axios = useAxiosPrivate();
  const [collapsed, setCOllapsed] = useState(false);
  const [classes, setClasses] = useState([]);
  const [deckCount, setDeckCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);

  //console.log("these are the classes", classes)
  useEffect(() => {
    const callGetClasses = async () => {
      const classes = await getClasses(username, axios);
      console.log("HERE IS CLASSES DATA", classes.data);
      setClasses(classes.data);
    };

    const callGetDecksFromUsername = async () => {
      const decks = await getDecksFromUsername(username);
      console.log(`NUMBER OF DECKS FOR USER ${username}`, decks.data[0]);
      setDeckCount(decks.data[0].count);
    };

    // username prop is a state variable and may be null
    if (username) {
      callGetClasses();
      callGetDecksFromUsername();
    }
  }, [username]);

  // if (classes.length > 0 && router.asPath === `/dashboard/${username}`) {
  //   router.push(`/dashboard/${username}/${classes[0].id}`)
  //   return
  // }

  return (
    <div
      className={collapsed ? styles.collapsed_container : styles.container}
      style={{ width }}
      data-fullscreen={width === "100%" ? "full" : null}
    >
      <UploadModal
        title={UPLOAD_TITLE}
        message={UPLOAD_IMAGE_MESSAGE}
        openModal={imageModal}
        modalSetter={setImageModal}
        contentID={username}
        profileFlag={true}
      />

      <div className={styles.header}>
        <div className={collapsed ? styles.collapsed_icons : styles.icons}>
          <Link href={`/dashboard/${username}`}>
            <img
              src={defaultImage.src}
              alt="site_icon"
              className={collapsed ? styles.collapsed_site_icon : "site_icon"}
            />
          </Link>
          <img
            src={
              profilePicture
                ? `${BASEURL}/static/${profilePicture}`
                : defaultImage.src
            }
            alt="profile_icon"
            className={
              collapsed ? styles.collapsed_profile_icon : "profile_icon"
            }
            onClick={() => setImageModal(true)}
          />
          {/* <UploadModal title="upload image" message="hello" openModal={imageModal} modalSetter={setImageModal} contentID={username} profileFlag={true}/>  */}
        </div>

        <div className={collapsed ? styles.hidden : styles.user_details}>
          <h3 className={styles.user_name}>{username}</h3>
          <p className={styles.user_stats}>
            286 Total Cards Studied • {deckCount} Decks Created
          </p>
        </div>
      </div>

      <div className={styles.classes}>
        <div className={collapsed ? styles.hidden : styles.classes_header}>
          <p className={styles.class_section_title}>
            My Classes ({classes.length})
          </p>
          <AiOutlinePlus
            className={styles.plus_icon}
            size={40}
            onClick={() => setOpenModal(true)}
          />
          <Modal
            contentSetter={setClasses}
            openModal={openModal}
            modalSetter={setOpenModal}
            title={ADD_CLASS_TITLE}
            message={ADD_ClASS_MESSAGE}
            username={username}
            buttons={[{ text: "Submit", onClick: addClass }]}
          />
        </div>

        <div className={styles.classes_content}>
          {classes.map((className) => (
            <ClassEntry
              key={className.id}
              collapsed={collapsed}
              name={className.class}
              username={username}
              classID={className.id}
              currClass={currClass}
              setClasses={setClasses}
              classPicture={className.class_picture}
            />
          ))}
        </div>
      </div>
      <button
        className={width === "100%" ? styles.hidden : styles.collapse_button}
        onClick={() => setCOllapsed((prev) => !prev)}
      >
        {collapsed ? <BsSkipForward size={15} /> : <BsSkipBackward size={15} />}
      </button>
    </div>
  );
};

export default Sidebar;
