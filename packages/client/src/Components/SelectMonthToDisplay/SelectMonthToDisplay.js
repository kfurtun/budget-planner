import * as React from "react";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

export const SelectMonthToDisplay = (props) => {
  const handleChangeYear = (event) => {
    console.log(event.getMonth() + 1);

    props.setSelectedDate(event);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("1950-01-01")}
          maxDate={new Date("2050-12-31")}
          value={props.selectedDate}
          onChange={handleChangeYear}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </div>
  );
};
