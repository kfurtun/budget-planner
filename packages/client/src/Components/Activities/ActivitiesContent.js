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
import { useDataFetch } from "../customHooks/customHooks";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";
import { ApiUrl } from "../../Constants";

export const ActivitiesContent = () => {
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  const [data, setData] = useRecoilState(userData);
  const [open, setOpen] = React.useState(false);
  const [triggerFetch, setTriggerFetch] = useRecoilState(triggerFetchState);
  const user = useRecoilValue(loggedInUserState);
  useDataFetch(setData, triggerFetch, user.id);

  const addItem = () => {
    setOpen(true);
  };
  const onSave = (entry) => {
    const itemsToBeSent = { entry, id: user.id };
    console.log(JSON.stringify(itemsToBeSent));
    fetch(`${ApiUrl}/insertUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsToBeSent),
    }).then(() => {
      setTriggerFetch(!triggerFetch);
    });
  };
  const dialogOff = () => {
    setOpen(false);
    // setTriggerFetch(!triggerFetch);
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
      <Grid container sx={{ marginTop: 5 }}>
        <Paper>
          <DatePickerForLineGraph
            valueOfDateForLineGraph={valueOfDateForLineGraph}
            setValueOfDateForLineGraph={setValueOfDateForLineGraph}
          />
        </Paper>
      </Grid>

      {user && (
        <ShowAll
          data={data}
          valueOfDateForLineGraph={valueOfDateForLineGraph}
          setValueOfDateForLineGraph={setValueOfDateForLineGraph}
        />
      )}
    </Container>
  );
};
