import styles from "./misc.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;

export const TinyLoader = () => {
  return (
    <div className={styles.tinyloader}>
      <div className={styles.tinyspinner}></div>
    </div>
  );
};
