import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MaterialLink from "@mui/material/Link";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Copyright } from "../Copyright";
import { useNavigate, Link } from "react-router-dom";
import { loggedInUserState } from "../states";
import { useRecoilState } from "recoil";

export const LoginPartial = () => {
  const [input, setInput] = React.useState({ email: "", password: "" });
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  let navigate = useNavigate();
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      "http://127.0.0.1:5000/login?email=" +
        input.email +
        "&password=" +
        input.password
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log("yanlis username password");
        return undefined;
      })
      .then((data) => {
        if (!data) {
          return;
        }

        setLoggedInUser({
          ...loggedInUser,
          email: input.email,
          id: data.Id,
          name: data.FirstName,
        });

        navigate("/dashboard");
      });
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInputChange}
          value={input.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={input.password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <MaterialLink href="#" variant="body2">
              <Link to="/forgotPassword">Forgot password?</Link>
            </MaterialLink>
          </Grid>
          <Grid item>
            <MaterialLink href="#" variant="body2">
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </MaterialLink>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  );
};
