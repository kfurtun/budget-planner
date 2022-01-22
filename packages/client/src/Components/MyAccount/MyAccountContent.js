import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../states";
import { PasswordBox } from "../PasswordBox";
import { EmailBox } from "../EmailBox";

export const MyAccountContent = () => {
  const user = useRecoilValue(loggedInUserState);

  const [input, setInput] = React.useState({
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      // justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: 500,
            height: 700,
            marginTop: 5,
          }}
        >
          <Grid item sx={{ marginBottom: 5 }}>
            Account Details
          </Grid>
          <Grid item sx={{ display: "flex", marginBottom: 5 }}>
            <TextField
              label="First Name"
              defaultValue={user.name}
              variant="filled"
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Last Name"
              defaultValue={user.lastName}
              variant="filled"
              sx={{ marginLeft: 6 }}
              disabled
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item sx={{ display: "flex", marginBottom: 5 }}>
            <EmailBox
              input={input}
              setInput={setInput}
              label="Current Email"
              value="currentEmail"
            />
          </Grid>
          <Grid item sx={{ display: "flex", marginBottom: 5 }}>
            <EmailBox
              input={input}
              setInput={setInput}
              label="New Email"
              value="newEmail"
            />

            <EmailBox
              input={input}
              setInput={setInput}
              label="Confirm New Email"
              value="confirmNewEmail"
              marginLeft={8}
            />
          </Grid>

          <Grid item sx={{ display: "flex", marginBottom: 5 }}>
            <PasswordBox
              name="Current Password"
              width={195}
              setInput={setInput}
              stateKey="currentPassword"
              input={input}
            />
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            <PasswordBox
              name="New Password"
              width={195}
              setInput={setInput}
              input={input}
              stateKey="newPassword"
            />
            <PasswordBox
              name="Confirm New Password"
              margin={7}
              width={205}
              setInput={setInput}
              input={input}
              stateKey="confirmNewPassword"
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
