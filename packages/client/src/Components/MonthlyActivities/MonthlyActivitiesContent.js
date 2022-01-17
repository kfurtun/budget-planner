import React from "react";
import { DeleteButton } from "../DeleteButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { selectedMonthAndYearToDisplay, userData } from "../states";
import { useRecoilValue, useRecoilState } from "recoil";
import { triggerFetchState } from "../states";

import { SelectMonthToDisplay } from "../SelectMonthToDisplay";

export const MonthlyActivitiesContent = (props) => {
  const selectedDate = useRecoilValue(selectedMonthAndYearToDisplay);
  const data = useRecoilValue(userData);
  const [triggerFetch, setTriggerFetch] = useRecoilState(triggerFetchState);
  const copiedData = [...data];
  copiedData.sort(function (a, b) {
    if (a.Year !== b.Year) {
      return b.Year - a.Year;
    } else if (a.Year === b.Year && a.Month !== b.Month) {
      return b.Month - a.Month;
    } else {
      return b.Day - a.Day;
    }
  });
  const arrOfSelectedDate = copiedData.filter(
    (data) =>
      data.Year === selectedDate.year && data.Month === selectedDate.month
  );
  console.log(selectedDate);
  // const arrToBeDisplayed =
  //   selectedDate.month === "" && selectedDate.year === ""
  //     ? copiedData
  //     : arrOfSelectedDate;
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <SelectMonthToDisplay />
      </Grid>
      <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Income/Expense</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {arrOfSelectedDate.map((row, index) => {
              const showDate = `${row.Day}-${row.Month}-${row.Year}`;

              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.Type}</TableCell>
                  <TableCell>{row.SubType}</TableCell>
                  <TableCell>{showDate}</TableCell>
                  {row.Type === "Expense" ? (
                    <TableCell
                      style={{ color: "red" }}
                    >{`$ ${row.Input}`}</TableCell>
                  ) : (
                    <TableCell>{`$ ${row.Input}`}</TableCell>
                  )}
                  <TableCell style={{ width: "150px" }}>
                    <DeleteButton
                      index={index}
                      data={copiedData}
                      setData={props.setData}
                      setTriggerFetch={setTriggerFetch}
                      triggerFetch={triggerFetch}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
