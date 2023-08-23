import styles from './misc.module.scss';
import { BiUpArrow } from 'react-icons/bi';
const BackToTop = () => {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
      className={styles.backtotop}
    >
      <BiUpArrow />
    </button>
  );
};

export default BackToTop;
