import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const InputsDashBoard = (props) => {
  const date = new Date();
  const selectedDate = date.getFullYear();
  const copiedData = [...props.data];
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
    (data) => data.Year === selectedDate
  );
  return (
    <>
      <div>Recent Inputs</div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Income/Expense</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>

            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrOfSelectedDate.map((row) => {
            const showDate = `${row.Day}-${row.Month}-${row.Year}`;
            return (
              <TableRow key={row.Id}>
                <TableCell>{row.Type}</TableCell>
                <TableCell>{row.SubType}</TableCell>
                <TableCell>{showDate}</TableCell>

                <TableCell align="right">{`$${row.Input}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </>
  );
};
