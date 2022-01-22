import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../states";
import { PasswordBox } from "../PasswordBox";
import { EmailBox } from "../EmailBox";
import { useNavigate } from "react-router-dom";

export const MyAccountContent = () => {
  const user = useRecoilValue(loggedInUserState);
  let navigate = useNavigate();
  const [input, setInput] = React.useState({
    currentEmail: "",
    newEmail: "",
    confirmNewEmail: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    errorText: "",
    showErrorText: false,
  });

  const changeEmailClicked = () => {
    if (
      input.currentEmail === user.email &&
      input.newEmail === input.confirmNewEmail
    ) {
      const itemsToBeSent = { email: input.newEmail, id: user.id };
      fetch("http://localhost:5000/changeUserEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemsToBeSent),
      }).then((response) => {
        if (response.ok) {
          setInput({ ...input, showErrorText: false });
          navigate("/");
        } else
          setInput({
            ...input,
            showErrorText: true,
            errorText: "This email is already being used!",
          });
      });
    }
  };

  //   const changePasswordClicked=()=>{

  //   }

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
          <Grid
            item
            sx={{
              display: "flex",
              marginBottom: 5,
              justifyContent: "flex-end",
              marginRight: 5,
              alignContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: 3 }}>
              {input.showErrorText && input.errorText}
            </Box>
            <Button variant="contained" onClick={changeEmailClicked}>
              Change Email
            </Button>
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
          <Grid item sx={{ display: "flex", marginBottom: 5 }}>
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
          <Grid
            item
            sx={{
              display: "flex",
              marginBottom: 5,
              justifyContent: "flex-end",
              marginRight: 5,
              alignContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: 3 }}>
              {input.showErrorText && input.errorText}
            </Box>
            {/* <Button variant="contained" onClick={changePasswordClicked}>
              Change Password
            </Button> */}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
