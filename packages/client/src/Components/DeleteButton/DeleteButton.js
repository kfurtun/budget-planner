import React from "react";
import { loggedInUserState } from "../states";
import { useRecoilValue } from "recoil";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteButton = (props) => {
  const user = useRecoilValue(loggedInUserState);
  const onDeleteClicked = () => {
    // const newData = [...props.data];
    // newData.splice(props.index, 1);
    // props.setData(newData);
    // console.log(props.data[props.index].Id);

    fetch("http://localhost:5000/deleteData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: props.data[props.index].Id,
        userId: user.id,
      }),
    }).then(() => props.setTriggerFetch(!props.triggerFetch));
  };

  return (
    <Button variant="contained" size="large" onClick={onDeleteClicked}>
      <DeleteIcon />
    </Button>
  );
};
