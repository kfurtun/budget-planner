import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { currency } from "../states";
import { useRecoilValue } from "recoil";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";

export const BalanceDashBoard = (props) => {
  const date = new Date();

  const currencyType = useRecoilValue(currency);

  let income = 0;
  let expense = 0;

  props.data.forEach((data) => {
    if (data.Type === "Income" && data.Year === date.getFullYear()) {
      income += data.Input;
    } else if (data.Type === "Expense" && data.Year === date.getFullYear()) {
      expense += data.Input;
    }
  });
  let balance = income - expense;
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 350,
          width: 350,
        }}
      >
        <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {date.getFullYear()}
          </Typography>
          <div style={{ paddingTop: 15 }}>
            <Stack spacing={1}>
              <Typography component="p" variant="h5">
                Balance
              </Typography>
              <Typography component="p" variant="h4">
                {currencyType} {balance.toFixed(2)}
                <Divider />
              </Typography>
              <Typography component="p" variant="h5">
                Income
              </Typography>
              <Typography component="p" variant="h4">
                {currencyType} {income.toFixed(2)}
                <Divider />
              </Typography>
              <Typography component="p" variant="h5">
                Expense
              </Typography>
              <Typography component="p" variant="h4">
                {currencyType} {expense.toFixed(2)}
              </Typography>
            </Stack>
          </div>
        </React.Fragment>
      </Paper>
    </Grid>
  );
};
