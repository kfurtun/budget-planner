/* eslint-disable no-unused-vars */
import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// import { PolarArea } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { expenses } from "../../Data/data";
import { leftShift, sum } from "mathjs";

export const ChartForExpense = (props) => {
  const foodArr = [];
  const billsArr = [];
  const transportationArr = [];
  const homeArr = [];
  const carArr = [];
  const entertainmentArr = [];
  const shoppingArr = [];
  const insuranceArr = [];
  const taxArr = [];
  const telephoneArr = [];
  const healthArr = [];
  const babyArr = [];
  const petArr = [];
  const electronicsArr = [];
  const travelArr = [];
  const othersArr = [];
  const expenseArr = props.data.filter((data) => {
    return (
      data.Type === "Expense" &&
      props.valueOfDateForPolarGraph.getMonth() + 1 === data.Month &&
      props.valueOfDateForPolarGraph.getFullYear() === data.Year
    );
  });

  expenseArr.forEach((userData) => {
    switch (userData.SubType) {
      case "Food":
        foodArr.push(userData.Input);
        break;
      case "Bills":
        billsArr.push(userData.Input);
        break;
      case "Transportation":
        transportationArr.push(userData.Input);
        break;
      case "Home":
        homeArr.push(userData.Input);
        break;
      case "Car":
        carArr.push(userData.Input);
        break;
      case "Entertainment":
        entertainmentArr.push(userData.Input);
        break;
      case "Shopping":
        shoppingArr.push(userData.Input);
        break;
      case "Insurance":
        insuranceArr.push(userData.Input);
        break;
      case "Tax":
        taxArr.push(userData.Input);
        break;
      case "Telephone":
        telephoneArr.push(userData.Input);
        break;
      case "Health":
        healthArr.push(userData.Input);
        break;
      case "Baby":
        babyArr.push(userData.Input);
        break;
      case "Pet":
        petArr.push(userData.Input);
        break;
      case "Electronics":
        electronicsArr.push(userData.Input);
        break;
      case "Travel":
        travelArr.push(userData.Input);
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
  // ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,

        text: `${
          months[props.valueOfDateForPolarGraph.getMonth()]
        }, ${props.valueOfDateForPolarGraph.getFullYear()} Expense`,
      },
    },

    // scales: {
    //   r: {
    //     beginAtZero: true,
    //     ticks: { stepSize: 20 },
    //   },
    // },
  };
  const data = {
    labels: expenses,
    datasets: [
      {
        label: "Expense",
        data: [
          sum(foodArr),
          sum(billsArr),
          sum(transportationArr),
          sum(homeArr),
          sum(carArr),
          sum(entertainmentArr),
          sum(shoppingArr),
          sum(insuranceArr),
          sum(taxArr),
          sum(telephoneArr),
          sum(healthArr),
          sum(babyArr),
          sum(petArr),
          sum(electronicsArr),
          sum(travelArr),
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
      <Doughnut data={data} options={options} />
    </>
  );
};
