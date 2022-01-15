import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const ExpensesAndIncomeRadio = (props) => {
  return (
    <RadioGroup row aria-label="budget" name="row-radio-buttons-group">
      <FormControlLabel
        value="Expense"
        control={
          <Radio
            checked={props.selectedRadioValue === "Expense"}
            onChange={props.radioButtonChanged}
          />
        }
        label="Expenses"
      />
      <FormControlLabel
        value="Income"
        control={
          <Radio
            checked={props.selectedRadioValue === "Income"}
            onChange={props.radioButtonChanged}
          />
        }
        label="Income"
      />
    </RadioGroup>
  );
};
