import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { userData, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { LineChart } from "../LineChart";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";

export const GraphsContent = () => {
  const [data, setData] = useRecoilState(userData);
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <DatePickerForLineGraph />
      </Grid>
      <Grid container spacing={3}>
        <LineChart
          valueOfDateForLineGraph={valueOfDateForLineGraph}
          setValueOfDateForLineGraph={setValueOfDateForLineGraph}
          data={data}
        />
      </Grid>
    </Container>
  );
};
