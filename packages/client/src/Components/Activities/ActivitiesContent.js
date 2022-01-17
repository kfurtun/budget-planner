import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ShowAll } from "../ShowAll";
import { OpenAddDialog } from "../OpenAddDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../states";
import Paper from "@mui/material/Paper";
import { userData } from "../states";
import { triggerFetchState } from "../states";

export const ActivitiesContent = () => {
  const [data, setData] = useRecoilState(userData);
  const [open, setOpen] = React.useState(false);
  const [triggerFetch, setTriggerFetch] = useRecoilState(triggerFetchState);
  const userEmail = useRecoilValue(loggedInUserState);
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/onlineUser?id=" + userEmail.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("yanlis username password");
        }
      })
      .then((userData) => setData(userData));
  }, [triggerFetch]);
  const addItem = () => {
    setOpen(true);
  };
  const onSave = (entry) => {
    const itemsToBeSent = { entry, id: userEmail.id };
    console.log(JSON.stringify(itemsToBeSent));
    fetch("http://localhost:5000/insertUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsToBeSent),
    });
    //.then(() => setTriggerFetch(true));
  };
  const dialogOff = () => {
    setOpen(false);
    setTriggerFetch(!triggerFetch);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button variant="contained" size="large" onClick={addItem}>
            Add
          </Button>
        </Grid>
        {open && (
          <OpenAddDialog open={open} onClose={dialogOff} onSave={onSave} />
        )}
      </Grid>
      <Grid container>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: 900,
            marginTop: 5,
          }}
        >
          {userEmail && (
            <ShowAll
              data={data}
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
            />
          )}
        </Paper>
      </Grid>
    </Container>
  );
};
