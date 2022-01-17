import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { LineChart } from "../LineChart";

export const LineChartDashBoard = (props) => {
  return (
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 350,
          width: 800,
        }}
      >
        <LineChart data={props.data} valueOfDateForLineGraph={new Date()} />
      </Paper>
    </Grid>
  );
};
