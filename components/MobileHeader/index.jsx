import styles from "./MobileHeader.module.css";
import defaultImage from "../../book.png";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { BASEURL } from "../../constants";

const MobileHeader = ({ username, profilePicture }) => {
  return (
    <div className={styles.container}>
      <Link href={`/dashboard/${username}`}>
        <div className={styles.exit}>
          <IoMdArrowBack size={40} />
          <p className={styles.my_classes}>My Classes</p>
        </div>
      </Link>

      <img
        src={
          profilePicture
            ? `${BASEURL}/static/${profilePicture}`
            : defaultImage.src
        }
        alt="profile_icon"
        className="profile_icon"
      />
    </div>
  );
};

export default MobileHeader;
