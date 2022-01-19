/* eslint-disable no-unused-vars */
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { userData, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { LineChart } from "../LineChart";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";
import { ChartForIncome } from "../ChartForIncome";
import { DatePickerForPolarChart } from "../DatePickerForPolarChart";

export const GraphsContent = () => {
  const [data, setData] = useRecoilState(userData);
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  // const [valueOfDateForPolarGraph, setValueOfDateForPolarGraph] =
  //   React.useState(new Date());
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
      {/* <Grid container>
        <DatePickerForPolarChart
          valueOfDateForLineGraph={valueOfDateForLineGraph}
          setValueOfDateForLineGraph={setValueOfDateForLineGraph}
        />
      </Grid>
      <Grid container spacing={3}>
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
          <ChartForIncome
            data={data}
            valueOfDateForPolarGraph={valueOfDateForPolarGraph}
          />
        </Paper>
      </Grid> */}
    </Container>
  );
};
