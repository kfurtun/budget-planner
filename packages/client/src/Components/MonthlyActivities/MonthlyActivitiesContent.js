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
import { selectedMonthAndYearToDisplay, userData } from "../states";
import { useRecoilValue, useRecoilState } from "recoil";
import { triggerFetchState, loggedInUserState } from "../states";

import { SelectMonthToDisplay } from "../SelectMonthToDisplay";
import { useDataFetch, useDataSorter } from "../customHooks/customHooks";

export const MonthlyActivitiesContent = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [data, setData] = useRecoilState(userData);

  const triggerFetch = useRecoilValue(triggerFetchState);
  const user = useRecoilValue(loggedInUserState);

  useDataFetch(setData, triggerFetch, user.id);
  console.log(selectedDate);
  const copiedData = [...data];
  useDataSorter(copiedData);

  const arrOfSelectedDate = copiedData.filter(
    (data) =>
      data.Year === selectedDate.getFullYear() &&
      data.Month === selectedDate.getMonth() + 1
  );
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container>
        <Paper>
          <SelectMonthToDisplay
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
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

          <TableBody>
            {arrOfSelectedDate.map((row, index) => {
              const showDate = `${row.Day}-${row.Month}-${row.Year}`;
              console.log(row.Id);
              return (
                <TableRow
                  key={index}
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
                    <DeleteButton id={row.Id} />
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
