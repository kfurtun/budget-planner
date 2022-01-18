/* eslint-disable no-unused-vars */
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { OpenAddDialog } from "../OpenAddDialog";

import { Banner } from "../Banner";
import { loggedInUserState } from "../states";
import { userData, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@mui/material/Button";

import { LineChart } from "../LineChart";
import { ChartForIncome } from "../ChartForIncome";
import { ChartForExpense } from "../ChartForExpense";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";
import { DatePickerForPolarChart } from "../DatePickerForPolarChart";
import { ButtonGroupForGraphs } from "../ButtonGroupForGraphs";

import styled from "styled-components";

import { LineChartDashBoard } from "../LineChartDashBoard";
import { BalanceDashBoard } from "../BalanceDashBoard";
import { InputsDashBoard } from "../InputsDashBoard";

export const Content = () => {
  const userEmail = useRecoilValue(loggedInUserState);
  const [data, setData] = useRecoilState(userData);
  // const [data, setData] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [triggerFetch, setTriggerFetch] = useRecoilState(triggerFetchState);
  const [isShowIncomeExpenseGraphs, setIsShowIncomeExpenseGraphs] =
    React.useState(false);
  const [isShowYearlyLineGraph, setIsShowYearlyLineGraph] =
    React.useState(false);
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  const [valueOfDateForPolarGraph, setValueOfDateForPolarGraph] =
    React.useState(new Date());

  console.log(userEmail);
  console.log(data);
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/onlineUser?id=" + userEmail.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("yanlis username password");
        }
      })
      .then((userData) => setData(userData));
  }, [setData, triggerFetch, userEmail.id]);
  console.log(data);
  //   const addItem = () => {
  //     setOpen(true);
  //   };
  //   const dialogOff = () => {
  //     setOpen(false);
  //     setTriggerFetch(!triggerFetch);
  //   };

  //   const onSave = (entry) => {
  //     const itemsToBeSent = { entry, id: userEmail.id };
  //     console.log(JSON.stringify(itemsToBeSent));
  //     fetch("http://localhost:5000/insertUserData", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(itemsToBeSent),
  //     }).then(() => setTriggerFetch(true));
  //   };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {userEmail && (
        <Grid container spacing={3}>
          <LineChartDashBoard
            valueOfDateForLineGraph={valueOfDateForLineGraph}
            setValueOfDateForLineGraph={setValueOfDateForLineGraph}
            data={data}
          />
          <BalanceDashBoard data={data} />
        </Grid>
      )}

      {userEmail && (
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              width: 1200,
              marginTop: 5,
            }}
          >
            <InputsDashBoard
              data={data}
              setData={setData}
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
            />
          </Paper>
        </Grid>
      )}
    </Container>
  );
};
