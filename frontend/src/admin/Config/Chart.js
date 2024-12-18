import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../Style/chart.scss";

const data = [
  { name: "January", SB: 4000, TA: 2400, amt: 2400 },
  { name: "February", SB: 3000, TA: 1398, amt: 2210 },
  { name: "March", SB: 2000, TA: 9800, amt: 2290 },
  { name: "April", SB: 2780, TA: 3908, amt: 2000 },
  { name: "May", SB: 1890, TA: 4800, amt: 2181 },
  { name: "June", SB: 2390, TA: 3800, amt: 2500 },
  { name: "July", SB: 3490, TA: 4300, amt: 2100 },
  { name: "August", SB: 3490, TA: 6800, amt: 2400 },
  { name: "September", SB: 2530, TA: 8500, amt: 3100 },
  { name: "October", SB: 3750, TA: 3300, amt: 2540 },
  { name: "November", SB: 1990, TA: 4750, amt: 4100 },
  { name: "December", SB: 4200, TA: 3100, amt: 2600 },
];

const getLast6MonthsData = () => {
  const currentMonth = new Date().getMonth(); // Current month (0-11)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 11) % 12;
    last6Months.push(months[monthIndex]);
  }

  return data.filter((item) => last6Months.includes(item.name));
};

const Chart = ({ aspect, title }) => {
  const data = getLast6MonthsData();
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="gray"
            className="chatGrid"
          />
          <XAxis dataKey="name" />

          <Tooltip />
          <Legend />
          <Bar dataKey="SB" fill="#8884d8" />
          <Bar dataKey="TA" fill="#82ca9d" />
          <Bar dataKey="amt" fill="#82cbad" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
