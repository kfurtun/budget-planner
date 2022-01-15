import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// import { PolarArea } from "react-chartjs-2";
import { income } from "../../Data/data";
import { sum } from "mathjs";
import { Doughnut } from "react-chartjs-2";

export const ChartForIncome = (props) => {
  const salaryArr = [];
  const awardsArr = [];
  const saleArr = [];
  const rentalArr = [];
  const dividensArr = [];
  const investmentsArr = [];
  const othersArr = [];
  const incomeArr = props.data.filter((data) => {
    return (
      data.Type === "Income" &&
      props.valueOfDateForPolarGraph.getMonth() + 1 === data.Month &&
      props.valueOfDateForPolarGraph.getFullYear() === data.Year
    );
  });

  incomeArr.forEach((userData) => {
    switch (userData.SubType) {
      case "Salary":
        salaryArr.push(userData.Input);
        break;
      case "Awards":
        awardsArr.push(userData.Input);
        break;
      case "Sale":
        saleArr.push(userData.Input);
        break;
      case "Rental":
        rentalArr.push(userData.Input);
        break;
      case "Dividens":
        dividensArr.push(userData.Input);
        break;
      case "Investments":
        investmentsArr.push(userData.Input);
        break;
      case "Others":
        othersArr.push(userData.Input);
        break;
      default:
        break;
    }
  });
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: true,

        text: `${
          months[props.valueOfDateForPolarGraph.getMonth()]
        }, ${props.valueOfDateForPolarGraph.getFullYear()} Income`,
      },
    },
  };
  const data = {
    labels: income,
    datasets: [
      {
        label: "Income",
        data: [
          sum(salaryArr),
          sum(awardsArr),
          sum(saleArr),
          sum(rentalArr),
          sum(dividensArr),
          sum(investmentsArr),
          sum(othersArr),
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(114, 242, 120, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(114, 242, 120, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  //   console.log(incomeState);
  return (
    <>
      <Doughnut options={options} data={data} />
    </>
  );
};
