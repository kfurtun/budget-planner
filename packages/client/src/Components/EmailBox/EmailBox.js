import React from "react";

import TextField from "@mui/material/TextField";
import { propTypes } from "react-bootstrap/esm/Image";

export const EmailBox = (props) => {
  const handleInputChange = (event) => {
    props.setInput({
      ...props.input,
      [props.value]: event.target.value,
    });
  };
  return (
    <TextField
      label={props.label}
      value={props.input.value}
      variant="standard"
      onChange={handleInputChange}
      sx={{ marginLeft: props.marginLeft }}
    />
  );
};
