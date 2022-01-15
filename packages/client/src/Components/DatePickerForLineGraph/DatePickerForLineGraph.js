import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const DatePickerForLineGraph = (props) => {
  return (
    <Div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          views={["year"]}
          label="Year only"
          minDate={new Date("1950-01-01")}
          value={props.valueOfDateForLineGraph}
          onChange={(newValue) => {
            props.setValueOfDateForLineGraph(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Div>
  );
};

const Div = styled.div`
  width: 250px;
`;
