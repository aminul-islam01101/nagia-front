import Image from "next/image";
import styles from "./misc.module.scss";
import search from "@/assets/search.svg";
import { MdArrowBack } from "react-icons/md";

const MobileSearch = ({ close }) => {
  return (
    <div className={styles.mobilesearch}>
      <div className={styles.searchgroup}>
        <div onClick={close}>
          <MdArrowBack size={20} />
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
          <div className={styles.image}>
            <Image src={search} alt="search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
