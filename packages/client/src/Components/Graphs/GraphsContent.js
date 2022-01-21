/* eslint-disable no-unused-vars */
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { userData, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { LineChart } from "../LineChart";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";
import { ChartForIncome } from "../ChartForIncome";
import { DatePickerForPolarChart } from "../DatePickerForPolarChart";
import { ChartForExpense } from "../ChartForExpense";

export const GraphsContent = () => {
  const [data, setData] = useRecoilState(userData);
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  const [valueOfDateForPolarGraph, setValueOfDateForPolarGraph] =
    React.useState(new Date());
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <Paper>
          <DatePickerForLineGraph
            valueOfDateForLineGraph={valueOfDateForLineGraph}
            setValueOfDateForLineGraph={setValueOfDateForLineGraph}
          />
        </Paper>
      </Grid>
      <Grid container>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: 1200,
            height: 400,
            marginTop: 5,
          }}
        >
          <LineChart
            valueOfDateForLineGraph={valueOfDateForLineGraph}
            setValueOfDateForLineGraph={setValueOfDateForLineGraph}
            data={data}
          />
        </Paper>
      </Grid>
      <Grid container>
        <Paper sx={{ marginTop: 5 }}>
          <DatePickerForPolarChart
            valueOfDateForPolarGraph={valueOfDateForPolarGraph}
            setValueOfDateForPolarGraph={setValueOfDateForPolarGraph}
          />
        </Paper>
      </Grid>
      <Grid container>
        <Paper
          sx={{
            p: 2,
            display: "flex",

            width: 1200,
            height: 600,
            marginTop: 5,
          }}
        >
          <Stack sx={{ width: 500 }}>
            <ChartForIncome
              data={data}
              valueOfDateForPolarGraph={valueOfDateForPolarGraph}
            />
          </Stack>

          <Stack sx={{ width: 500, marginLeft: 5 }}>
            <ChartForExpense
              data={data}
              valueOfDateForPolarGraph={valueOfDateForPolarGraph}
            />
          </Stack>
        </Paper>
      </Grid>
    </Container>
  );
};
