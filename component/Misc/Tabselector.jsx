import styles from "./misc.module.scss";

export const TabSelector = ({ isActive, children, onClick }) => (
  <button
    className={`${styles.btn} ${
      isActive
        ? styles.active
        : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
