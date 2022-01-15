import React from "react";
import { DeleteButton } from "../DeleteButton";
import { ShowAll } from "../ShowAll";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { selectedMonthAndYearToDisplay } from "../states";
import { useRecoilValue } from "recoil";

export const ShowRows = (props) => {
  const selectedDate = useRecoilValue(selectedMonthAndYearToDisplay);
  const copiedData = [...props.data];
  copiedData.sort(function (a, b) {
    if (a.Year !== b.Year) {
      return a.Year - b.Year;
    } else if (a.Year === b.Year && a.Month !== b.Month) {
      return a.Month - b.Month;
    } else {
      return a.Day - b.Day;
    }
  });
  const arrOfSelectedDate = props.data.filter(
    (data) =>
      data.Year === selectedDate.year && data.Month === selectedDate.month
  );
  console.log(selectedDate);
  // const arrToBeDisplayed =
  //   selectedDate.month === "" && selectedDate.year === ""
  //     ? copiedData
  //     : arrOfSelectedDate;
  return (
    <div>
      {selectedDate.month === "" && selectedDate.year === "" ? (
        <ShowAll
          copiedData={copiedData}
          // data={props.data}
          // setData={props.setData}
          setTriggerFetch={props.setTriggerFetch}
          triggerFetch={props.triggerFetch}
        />
      ) : (
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
                        setTriggerFetch={props.setTriggerFetch}
                        triggerFetch={props.triggerFetch}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* {arrOfSelectedDate.map((row, index) => {
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
                          data={props.data}
                          setData={props.setData}
                          setTriggerFetch={props.setTriggerFetch}
                          triggerFetch={props.triggerFetch}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })} */}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
