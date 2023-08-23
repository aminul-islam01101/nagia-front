import styles from "./misc.module.scss";

const ButtonFill = ({ text }) => {
  return <button className={styles.btnfill}>{text}</button>;
};

const ButtonsOutline = ({ text }) => {
  return <button className={styles.btnoutline}>{text}</button>;
};

export { ButtonFill, ButtonsOutline };
