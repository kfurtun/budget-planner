import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { expenses } from "../../Data/data";
import { income } from "../../Data/data";

export const ExpensesAndIncomeSelect = (props) => {
  const itemsList = () => {
    if (props.selectedRadioValue === "Expense") {
      return expenses.map((x) => <MenuItem value={x}>{x}</MenuItem>);
    } else {
      return income.map((x) => <MenuItem value={x}>{x}</MenuItem>);
    }
  };
  return (
    <div>
      {props.selectedRadioValue && (
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          //   value={age}
          onChange={props.onSelectChanged}
        >
          {itemsList()}
        </Select>
      )}
    </div>
  );
};
