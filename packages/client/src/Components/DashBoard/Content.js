/* eslint-disable no-unused-vars */
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { loggedInUserState } from "../states";
import { userData, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";

import { LineChartDashBoard } from "../LineChartDashBoard";
import { BalanceDashBoard } from "../BalanceDashBoard";
import { InputsDashBoard } from "../InputsDashBoard";
import { useDataFetch } from "../customHooks/customHooks";

export const Content = () => {
  const user = useRecoilValue(loggedInUserState);
  const [data, setData] = useRecoilState(userData);

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

  useDataFetch(setData, triggerFetch, user.id);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {user && (
        <Grid container spacing={3}>
          <LineChartDashBoard
            valueOfDateForLineGraph={valueOfDateForLineGraph}
            setValueOfDateForLineGraph={setValueOfDateForLineGraph}
            data={data}
          />
          <BalanceDashBoard data={data} />
        </Grid>
      )}

      {user && (
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
