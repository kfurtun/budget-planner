import React from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import styled from "styled-components";

export const DateSelect = (props) => {
  return (
    <Div>
      {/* {props.selectOnChange && (
        <input
          type="date"
          onChange={props.onDateChanged}
          max="2999-12-31"
        ></input>
      )} */}
      {props.selectOnChange && (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Date"
            inputFormat="dd/MM/yyyy"
            value={props.value}
            // onChange={handleChange}
            minDate={new Date("1950-01-01")}
            onChange={props.onDateChanged}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    </Div>
  );
};

const Div = styled.div`
  margin-top: 20px;
`;
