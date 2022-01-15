import React from "react";
import { SelectMonthToDisplay } from "../SelectMonthToDisplay";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../states";
import styled from "styled-components";
import { selectedMonthAndYearToDisplay } from "../states";
import { useNavigate } from "react-router-dom";

export const Banner = (props) => {
  const [selectedDate, setSelectedDate] = useRecoilState(
    selectedMonthAndYearToDisplay
  );
  const [user, setUser] = useRecoilState(loggedInUserState);

  let navigate = useNavigate();
  // const onGoClicked = () => {
  //   fetch(
  //     "http://127.0.0.1:5000/displayMonthAndYear?month=" +
  //       selectedDate.month +
  //       "&year=" +
  //       selectedDate.year +
  //       "&id=" +
  //       user.id
  //   )
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         console.log("yanlis username password");
  //       }
  //     })
  //     .then((userData) => props.setData(userData));
  //   props.goClicked();
  // };

  const onShowAllClicked = () => {
    props.setTriggerFetch(!props.triggerFetch);
    setSelectedDate({ month: "", year: "" });
  };
  const onLogoutClicked = () => {
    setUser({ ...user, id: "", email: "", name: "" });
    navigate("/");
  };
  return (
    <Container>
      {user && <div>{`Welcome ${user.name}`}</div>}
      {/* <TemporaryDrawer /> */}
      <SelectMonthToDisplay data={props.data} setData={props.setData} />
      <Stack>
        <GoDiv>
          {/* <Button size="large" onClick={onGoClicked}>
            Go
          </Button> */}
          <Button size="large" onClick={onShowAllClicked}>
            Show All
          </Button>
        </GoDiv>
        <Button size="large" onClick={onLogoutClicked}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
};

const GoDiv = styled.div`
  width: 200px;
  height: 56px;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
`;
