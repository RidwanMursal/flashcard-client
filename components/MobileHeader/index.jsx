import styles from "./MobileHeader.module.css";
import defaultImage from "../../book.png";
import Sidebar from "../Sidebar/index";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useStateContext } from "../../context/authContext";

const MobileHeader = ({ username, profilePicture }) => {
  return (
    <div className={styles.container}>
      <Link href={`/dashboard/${username}`}>
        <div className={styles.exit}>
          <IoMdArrowBack size={40} />
          <p className={styles.my_classes}>My Classes</p>
        </div>
      </Link>

      <img src={defaultImage.src} alt="profile_icon" className="profile_icon" />
    </div>
  );

  // return ( visibleSidebar ? <Sidebar width={"100%"}/> :
  //   <div className={styles.container}>

  //       <div className={styles.exit}>
  //         <IoMdArrowBack size={40} onClick={() => setvisibleSidebar((prev) => !prev) }/>
  //         <p className={styles.my_classes}>My Classes</p>
  //       </div>

  //       <img src={x.src} alt="site_icon" className="site_icon"/>
  //       <img src={x.src} alt="profile_icon" className="profile_icon"/>
  //   </div>
  // )
};

export default MobileHeader;
