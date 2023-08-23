import styles from "./faq.module.scss";
import { HiPlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const FAQ = ({ title, body }) => {
  const [showAdd, setShowAdd] = useState(false);

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className={styles.faq}>
      <div className={styles.faq__heading}>
        <h2 className={styles.h2}>{title}</h2>
        <div className={`${styles.faq__icon}`} onClick={toggleAdd}>
          {showAdd ? (
            <RxCross2 size={28} color="#A6631B" />
          ) : (
            <HiPlus size={28} color="#A6631B" />
          )}
        </div>
      </div>
      {showAdd && (
        <div className={styles.faq__details}>
          <p className={styles.p}>{body}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
