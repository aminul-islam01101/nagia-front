import DataFilter from "@/component/Misc/DataFilter";
import ReactECharts from "echarts-for-react";
import styles from "./dashboardportfolio.module.scss";

const PortfolioChart = ({ type, title }) => {
  const gridPerformance = {
    left: "3%",
    right: "4%",
    bottom: "10%",
    top: "10%",
    containLabel: true,
  };

  //   const legend: {}

  const option = {
    legend: { left: 0, show: type === "overall" && true },

    tooltip: {
      trigger: "axis",
      showContent: false,
    },
    dataset: {
      source: [
        ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
        ["Gross Yield", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ["Net Yield", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ["Potential Yield", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ],
    },
    xAxis: { type: "category" },
    yAxis: { gridIndex: 0, splitLine: false },
    grid: type === "portfolio" && gridPerformance,

    series: [
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
      {
        type: "line",
        smooth: true,
        seriesLayoutBy: "row",
        emphasis: { focus: "series" },
      },
    ],
  };

  return (
    <div className={styles.portfoliochart}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        {type === "overall" && (
          <DataFilter outerBackground="#FBF8F6 " inner="#FFFFFF" />
        )}
      </div>
      <ReactECharts
        option={option}
        style={{ height: type === "portfolio" ? 150 : 350 }}
      />
    </div>
  );
};

export default PortfolioChart;
