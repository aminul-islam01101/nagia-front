import ReactECharts from 'echarts-for-react';
import { graphic } from 'echarts';
import { useEffect, useState } from 'react';
import moment from 'moment';

const DashboardChart = ({ chartData }) => {
  const [monthlyData, SetMonthlyData] = useState();

  useEffect(() => {
    const obj = chartData?.data.stats.monthly;

    if (obj !== undefined) {
      var result = Object.keys(obj).map((key) => [
        moment(key, 'mm-MMMM').format('MMMM-YYYY'),
        obj[key],
      ]);
    }
    SetMonthlyData(result);
  }, [chartData?.data.stats.monthly]);

  console.log(monthlyData);
  const option = {
    grid: {
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: false,
    },
    yAxis: {
      type: 'value',
      splitLine: false,
    },
    series: [
      {
        data: monthlyData,
        type: 'line',
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FFC72C',
            },
            {
              offset: 1,
              color: 'rgba(255, 199, 44, 0.02)',
            },
          ]),
        },
        lineStyle: { color: '#B58D1F' },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: 350, width: '100%' }} />
    </div>
  );
};

export default DashboardChart;
