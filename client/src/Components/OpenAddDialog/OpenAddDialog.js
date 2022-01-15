import React from "react";

import { ExpensesAndIncomeRadio } from "../ExpensesAndIncomeRadio";
import { ExpensesAndIncomeSelect } from "../ExpensesAndIncomeSelect";
import { ExpensesAndIncomeInput } from "../ExpensesAndIncomeInput";
import { DateSelect } from "../DateSelect";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

export const OpenAddDialog = (props) => {
  const [selectOnChange, setSelectOnChange] = React.useState("");
  const onSelectChanged = (e) => {
    setSelectOnChange(e.target.value);
  };

  const [selectedRadioValue, setSelectedRadioValue] = React.useState("");
  const radioButtonChanged = (e) => {
    setSelectedRadioValue(e.target.value);
  };

  const [input, setInput] = React.useState("");
  const onInputChanged = (e) => {
    setInput(e.target.value);
  };

  const [date, setDate] = React.useState(null);
  const onDateChanged = (e) => {
    setDate(e);
  };
  console.log(date);
  const onSaveClicked = () => {
    if (
      input === "" ||
      date === "" ||
      selectOnChange === "" ||
      selectedRadioValue === "" ||
      isNaN(input)
    ) {
      return;
    } else {
      props.onSave({
        subType: selectOnChange,
        type: selectedRadioValue,
        input,
        // date:
        //   date.getDate() +
        //   "-" +
        //   (date.getMonth() + 1) +
        //   "-" +
        //   date.getFullYear(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });

      props.onClose();
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add"}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <ExpensesAndIncomeRadio
              selectedRadioValue={selectedRadioValue}
              radioButtonChanged={radioButtonChanged}
            />

            <ExpensesAndIncomeSelect
              selectedRadioValue={selectedRadioValue}
              onSelectChanged={onSelectChanged}
            />

            <ExpensesAndIncomeInput
              selectOnChange={selectOnChange}
              onInputChanged={onInputChanged}
            />

            <DateSelect
              selectOnChange={selectOnChange}
              onDateChanged={onDateChanged}
              value={date}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSaveClicked}>Save</Button>
          <Button onClick={props.onClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
