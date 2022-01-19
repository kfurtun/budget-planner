import * as React from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDataSorter } from "../customHooks/customHooks";

export const InputsDashBoard = (props) => {
  const date = new Date();
  const selectedDate = date.getFullYear();
  const copiedData = [...props.data];
  useDataSorter(copiedData);
  const arrOfSelectedDate = copiedData.filter(
    (data) => data.Year === selectedDate
  );

  return (
    <>
      <div>Recent Activities</div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Income/Expense</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>

            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrOfSelectedDate.slice(0, 5).map((row) => {
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
      <Link to="/activities">See more orders</Link>
    </>
  );
};
