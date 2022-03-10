import * as React from "react";

import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://kutayfurtun.com/" target="_blank">
        Kutay Furtun
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
