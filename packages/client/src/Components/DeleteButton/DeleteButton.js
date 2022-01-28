import React from "react";
import { loggedInUserState, triggerFetchState } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApiUrl } from "../../Constants";

export const DeleteButton = (props) => {
  const user = useRecoilValue(loggedInUserState);
  const [triggerFetch, setTriggerFetch] = useRecoilState(triggerFetchState);

  const onDeleteClicked = () => {
    fetch(`${ApiUrl}/deleteData`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: props.id,
        userId: user.id,
      }),
    }).then(() => {
      setTriggerFetch(!triggerFetch);
    });
    console.log(props.id);
  };

  return (
    <Button variant="contained" size="large" onClick={onDeleteClicked}>
      <DeleteIcon />
    </Button>
  );
};
