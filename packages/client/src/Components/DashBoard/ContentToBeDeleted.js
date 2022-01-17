import React from "react";
import { OpenAddDialog } from "../OpenAddDialog";
import { ShowRows } from "../ShowRows";
import { Banner } from "../Banner";
import { loggedInUserState } from "../states";
import { userData } from "../states";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@mui/material/Button";

import { LineChart } from "../LineChart";
import { ChartForIncome } from "../ChartForIncome";
import { ChartForExpense } from "../ChartForExpense";
import { DatePickerForLineGraph } from "../DatePickerForLineGraph";
import { DatePickerForPolarChart } from "../DatePickerForPolarChart";
import { ButtonGroupForGraphs } from "../ButtonGroupForGraphs";

import styled from "styled-components";
import { SelectMonthToDisplay } from "../SelectMonthToDisplay";

export const ContentToBeDeleted = () => {
  const userEmail = useRecoilValue(loggedInUserState);
  const [data, setData] = React.useState([]);
  // const [data, setData] = useRecoilState(userData);
  const [open, setOpen] = React.useState(false);
  const [triggerFetch, setTriggerFetch] = React.useState(false);
  const [isShowIncomeExpenseGraphs, setIsShowIncomeExpenseGraphs] =
    React.useState(false);
  const [isShowYearlyLineGraph, setIsShowYearlyLineGraph] =
    React.useState(false);
  const [valueOfDateForLineGraph, setValueOfDateForLineGraph] = React.useState(
    new Date()
  );
  const [valueOfDateForPolarGraph, setValueOfDateForPolarGraph] =
    React.useState(new Date());

  console.log(userEmail);
  console.log(data);
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
  console.log(data);
  const addItem = () => {
    setOpen(true);
  };
  const dialogOff = () => {
    setOpen(false);
    setTriggerFetch(!triggerFetch);
    // setTriggerFetch(false);
  };

  const onSave = (entry) => {
    // setData([
    //   ...data,
    //   {
    //     input: entry.input,
    //     date: entry.date,
    //     type: entry.type,
    //     subType: entry.subType,
    //   },
    // ]);
    const itemsToBeSent = { entry, id: userEmail.id };
    console.log(JSON.stringify(itemsToBeSent));
    fetch("http://localhost:5000/insertUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemsToBeSent),
    }).then(() => setTriggerFetch(true));
  };

  return (
    <div>
      <Banner
        data={data}
        setData={setData}
        setTriggerFetch={setTriggerFetch}
        triggerFetch={triggerFetch}
      />
      <Button variant="contained" size="large" onClick={addItem}>
        Add
      </Button>

      {open && (
        <OpenAddDialog open={open} onClose={dialogOff} onSave={onSave} />
      )}
      <MainDiv>
        {userEmail && (
          <ShowRows
            data={data}
            setData={setData}
            setTriggerFetch={setTriggerFetch}
            triggerFetch={triggerFetch}
          />
        )}
        <ButtonAndGraphsDiv>
          <ButtonGroupForGraphs
            setIsShowIncomeExpenseGraphs={setIsShowIncomeExpenseGraphs}
            isShowIncomeExpenseGraphs={isShowIncomeExpenseGraphs}
            setIsShowYearlyLineGraph={setIsShowYearlyLineGraph}
            isShowYearlyLineGraph={isShowYearlyLineGraph}
          />

          {isShowIncomeExpenseGraphs && (
            <ChartDiv>
              <DatePickerForPolarChart
                valueOfDateForPolarGraph={valueOfDateForPolarGraph}
                setValueOfDateForPolarGraph={setValueOfDateForPolarGraph}
              />

              <PolarGraphContainer>
                <ChartForIncome
                  data={data}
                  valueOfDateForPolarGraph={valueOfDateForPolarGraph}
                />

                <ChartForExpense
                  data={data}
                  valueOfDateForPolarGraph={valueOfDateForPolarGraph}
                />
              </PolarGraphContainer>
            </ChartDiv>
          )}

          {isShowYearlyLineGraph && (
            <ChartDiv>
              <DatePickerForLineGraph
                valueOfDateForLineGraph={valueOfDateForLineGraph}
                setValueOfDateForLineGraph={setValueOfDateForLineGraph}
              />
              <LineChart
                data={data}
                valueOfDateForLineGraph={valueOfDateForLineGraph}
              />
            </ChartDiv>
          )}
        </ButtonAndGraphsDiv>
      </MainDiv>
    </div>
  );
};

const ChartDiv = styled.div`
  width: 750px;
  height: 750px;
  display: flex;
  margin-left: 30px;
  flex-direction: column;
  align-items: center;
`;

const MainDiv = styled.div`
  display: flex;
`;

const ButtonAndGraphsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PolarGraphContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
`;
