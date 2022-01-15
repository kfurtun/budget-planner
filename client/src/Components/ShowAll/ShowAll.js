import React from "react";
import { DeleteButton } from "../DeleteButton";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { sum } from "mathjs";
import { BalanceBanner } from "../BalanceBanner";

export const ShowAll = (props) => {
  const result = props.copiedData.reduce(function (total, currentValue) {
    total[currentValue.Year] = total[currentValue.Year] || [];
    total[currentValue.Year].push(currentValue);
    return total;
  }, Object.create(null));

  return (
    <div>
      <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          {Object.keys(result).map((key) => {
            const incomeArr = [];
            const expenseArr = [];
            result[key].forEach((data) => {
              if (data.Type === "Expense") {
                expenseArr.push(data.Input);
              } else {
                incomeArr.push(data.Input);
              }
            });
            const balance = sum(incomeArr) - sum(expenseArr);

            return (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    {balance < 0 ? (
                      <BalanceBanner
                        dataKey={key}
                        color="#c62828"
                        balance={balance}
                        sumIncome={sum(incomeArr)}
                        sumExpense={sum(expenseArr)}
                      />
                    ) : (
                      <BalanceBanner
                        dataKey={key}
                        color="#2e7d32"
                        balance={balance}
                        sumIncome={sum(incomeArr)}
                        sumExpense={sum(expenseArr)}
                      />
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <TableHead>
                        <TableRow>
                          <TableCell>Income/Expense</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      {result[key].map((data, index) => {
                        const showDate = `${data.Day}-${data.Month}-${data.Year}`;
                        return (
                          <>
                            <TableBody>
                              {" "}
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
                              <TableCell style={{ width: "150px" }}>
                                <DeleteButton
                                  index={index}
                                  data={props.copiedData}
                                  setData={props.setData}
                                  setTriggerFetch={props.setTriggerFetch}
                                  triggerFetch={props.triggerFetch}
                                />
                              </TableCell>
                            </TableBody>
                          </>
                        );
                      })}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
        </Table>
      </TableContainer>
    </div>
  );
};
