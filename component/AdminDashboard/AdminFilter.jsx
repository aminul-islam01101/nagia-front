import Image from "next/image";
import styles from "./admin.module.scss";
import filter from "@/assets/filter.svg";
import search from "@/assets/search.svg";

const AdminFilter = () => {
  return (
    <div className={styles.adminfilter}>
      <div className={styles.search}>
        <input type="text" placeholder="Search" />
        <div className={styles.image}>
          <Image src={search} alt="search" />
        </div>
      </div>{" "}
      <button>
        <Image src={filter} alt="filter" /> Filter
      </button>
    </div>
  );
};

export default AdminFilter;
