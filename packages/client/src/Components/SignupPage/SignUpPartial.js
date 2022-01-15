import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import MaterialLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../Copyright";
import { useNavigate, Link } from "react-router-dom";
import { loggedInUserState } from "../states";
import { useRecoilState } from "recoil";

const theme = createTheme();

export function SignUpPartial() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [inputState, setInputState] = React.useState({});
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setInputState({ ...inputState, [name]: value });
  };
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputState.password !== inputState.confirmPassword) {
      setInputState({
        ...inputState,
        errorBox: true,
        errorMessage: "Your password cannot be confirmed",
      });
    } else if (inputState.password.length < 10) {
      setInputState({
        ...inputState,
        errorBox: true,
        errorMessage: "Your password is shorter than 10 character",
      });
    } else {
      setInputState({
        ...inputState,
        errorBox: false,
      });
      fetch("http://localhost:5000/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: inputState.firstName,
          lastName: inputState.lastName,
          email: inputState.email,
          password: inputState.password,
        }),
      })
        .then((response) => {
          if (response.status == 400) {
            setInputState({
              ...inputState,
              errorBox: true,
              errorMessage: "This email is already registered",
            });
          }
          return response.json();
        })
        .then((data) => {
          setLoggedInUser({
            ...loggedInUser,
            email: data.Email,
            id: data.Id,
            name: data.FirstName,
          });
          console.log(data);
          navigate("/content");
        });
    }
    console.log(loggedInUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={inputState.firstName}
                  required
                  fullWidth
                  label="First Name"
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={inputState.lastName}
                  autoComplete="family-name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={inputState.email}
                  autoComplete="email"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={inputState.password}
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  value={inputState.confirmPassword}
                  label="Confirm Password"
                  type="password"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink href="#" variant="body2">
                  <Link to="/"> Already have an account? Sign in</Link>
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
