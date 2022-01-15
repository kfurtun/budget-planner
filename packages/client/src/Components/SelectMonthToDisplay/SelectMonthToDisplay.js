import * as React from "react";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useSetRecoilState } from "recoil";
import { selectedMonthAndYearToDisplay } from "../states";

export const SelectMonthToDisplay = () => {
  const [yearAndMonth, setYearAndMonth] = React.useState(new Date());
  const setShowedYearAndMonth = useSetRecoilState(
    selectedMonthAndYearToDisplay
  );
  const handleChangeYear = (event) => {
    console.log(event.getMonth() + 1);
    setYearAndMonth(event);
    setShowedYearAndMonth({
      month: event.getMonth() + 1,
      year: event.getFullYear(),
    });
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("1950-01-01")}
          maxDate={new Date("2050-12-31")}
          value={yearAndMonth}
          onChange={handleChangeYear}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </div>
  );
};
