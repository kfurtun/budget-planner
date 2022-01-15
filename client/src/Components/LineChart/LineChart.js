import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { currency } from "../states";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = (props) => {
  const currencyType = useRecoilValue(currency);
  const incomeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const expenseArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  props.data.forEach((data) => {
    if (
      data.Type === "Income" &&
      props.valueOfDateForLineGraph.getFullYear() === data.Year
    ) {
      let j = data.Month;
      incomeArr[j - 1] += data.Input;
    } else if (
      data.Type === "Expense" &&
      props.valueOfDateForLineGraph.getFullYear() === data.Year
    ) {
      let j = data.Month;
      expenseArr[j - 1] += data.Input;
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.valueOfDateForLineGraph.getFullYear(),
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 20,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: currencyType,
          font: {
            size: 20,
          },
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return currencyType + value;
          },
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeArr,

        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: expenseArr,

        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
