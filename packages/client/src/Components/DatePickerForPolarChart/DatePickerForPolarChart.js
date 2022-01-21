import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

export const DatePickerForPolarChart = (props) => {
  return (
    <Div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("1950-01-01")}
          // maxDate={new Date("2023-06-01")}
          value={props.valueOfDateForPolarGraph}
          onChange={(newValue) => {
            props.setValueOfDateForPolarGraph(newValue);
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
