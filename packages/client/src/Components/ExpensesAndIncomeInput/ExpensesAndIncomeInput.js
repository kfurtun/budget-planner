import React from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FormControl from "@mui/material/FormControl";

export const ExpensesAndIncomeInput = (props) => {
  return (
    <div>
      {props.selectOnChange && (
        <FormControl>
          <Input
            autoComplete="off"
            onChange={props.onInputChanged}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </div>
  );
};
