import styles from "./dashboardportfolio.module.scss";
import PortfolioChart from "./PortfolioChart";

const ChartModal = ({ close }) => {
  return (
    <div>
      <div className={styles.modal}>
        <button className={styles.close} onClick={close}>
          &times;
        </button>
        <div className={styles.header}> Portfolio Performance </div>
        <div className={styles.content}>
          <PortfolioChart type="portfolio" title="Portfolio Performace" />
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
