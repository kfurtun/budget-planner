import React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { currency } from "../states";
import { useRecoilValue } from "recoil";

export const BalanceBanner = (props) => {
  const currencyType = useRecoilValue(currency);

  return (
    <Typography>
      <Container>
        <span style={{ fontWeight: "bold" }}>{props.dataKey}</span>
        <Div>
          <Span
            color={props.color}
          >{`Balance: ${currencyType} ${props.balance}`}</Span>
          <Span color="#2e7d32">{`Income: ${currencyType}${props.sumIncome}`}</Span>
          <Span color="#c62828">{`Expense: ${currencyType} ${props.sumExpense}`}</Span>
        </Div>
      </Container>
    </Typography>
  );
};

const Span = styled.span`
  color: white;
  background-color: ${(props) => props.color};
  margin-right: 6px;
  padding: 4px;
  font-weight: bold;
`;

const Div = styled.div`
  /* display: flex;
  justify-content: flex-end; */
`;

const Container = styled.div`
  /* display: flex;
  align-items: center; */
`;
