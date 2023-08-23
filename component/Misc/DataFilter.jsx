import { useState } from "react";
import styles from "./misc.module.scss";

const DataFilter = ({ outerBackground, inner }) => {
  const [period, setPeriod] = useState("day");

  const changePeriod = (periodValue) => {
    setPeriod(periodValue);
  };

  return (
    <div className={styles.datafilter} style={{ background: outerBackground }}>
      <button
        onClick={() => changePeriod("day")}
        style={{ background: period === "day" && inner }}
      >
        1D
      </button>
      <button
        onClick={() => changePeriod("week")}
        style={{ background: period === "week" && inner }}
      >
        1W
      </button>
      <button
        onClick={() => changePeriod("month")}
        style={{ background: period === "month" && inner }}
      >
        1M
      </button>
    </div>
  );
};

export default DataFilter;
