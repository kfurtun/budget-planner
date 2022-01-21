import React from "react";
import { DeleteButton } from "../DeleteButton";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRecoilValue } from "recoil";

import { currency } from "../states";
import { sum } from "mathjs";
import { BalanceBanner } from "../BalanceBanner";

import { useDataSorter } from "../customHooks/customHooks";

export const ShowAll = (props) => {
  // const result = copiedData.reduce(function (total, currentValue) {
  //   total[currentValue.Year] = total[currentValue.Year] || [];
  //   total[currentValue.Year].push(currentValue);
  //   return total;
  // }, Object.create(null));

  const currencyType = useRecoilValue(currency);
  const copiedData = props.data.filter(
    (data) => data.Year === props.valueOfDateForLineGraph.getFullYear()
  );
  useDataSorter(copiedData);
  const incomeArr = [];
  const expenseArr = [];
  copiedData.forEach((data) => {
    if (data.Type === "Expense") {
      expenseArr.push(data.Input);
    } else {
      incomeArr.push(data.Input);
    }
  });
  const balance = sum(incomeArr) - sum(expenseArr);
  console.log(expenseArr);
  return (
    <>
      <Box
        item
        sx={{
          display: "flex",
          marginTop: 5,
          background: "#1976d2",
          height: 75,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          color: "white",
          fontWeight: "bold",
          borderRadius: 3,
        }}
      >
        <span>{`Balance: ${currencyType} ${balance}`}</span>
      </Box>
      <Grid
        item
        sx={{ marginTop: 5, maxWidth: 1000 }}
        lg={11.4}
        md={12}
        xl={10.85}
      >
        <Paper sx={{ maxWidth: 1000 }}>
          {balance < 0 ? (
            <BalanceBanner
              year={props.valueOfDateForLineGraph.getFullYear()}
              color="#c62828"
              balance={balance}
              sumIncome={sum(incomeArr)}
              sumExpense={sum(expenseArr)}
            />
          ) : (
            <BalanceBanner
              year={props.valueOfDateForLineGraph.getFullYear()}
              color="#2e7d32"
              balance={balance}
              sumIncome={sum(incomeArr)}
              sumExpense={sum(expenseArr)}
            />
          )}
        </Paper>
      </Grid>

      <TableContainer sx={{ maxWidth: 1000, marginTop: 5 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Income/Expense</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>

          {copiedData.map((data, index) => {
            const showDate = `${data.Day}-${data.Month}-${data.Year}`;
            return (
              <>
                <TableBody key={index}>
                  <TableCell>{data.Type}</TableCell>
                  <TableCell>{data.SubType}</TableCell>
                  <TableCell>{showDate}</TableCell>
                  {data.Type === "Expense" ? (
                    <TableCell
                      style={{ color: "#c62828" }}
                    >{`$ ${data.Input}`}</TableCell>
                  ) : (
                    <TableCell>{`$ ${data.Input}`}</TableCell>
                  )}
                  <TableCell sx={{ width: 150 }}>
                    <DeleteButton id={data.Id} />
                  </TableCell>
                </TableBody>
              </>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};
