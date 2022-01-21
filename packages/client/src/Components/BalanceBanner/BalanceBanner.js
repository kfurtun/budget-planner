import React from "react";

import styled from "styled-components";

import { currency } from "../states";
import { useRecoilValue } from "recoil";

export const BalanceBanner = (props) => {
  const currencyType = useRecoilValue(currency);

  const widthIncome = props.sumIncome / (props.sumIncome + props.sumExpense);
  const widthExpense = props.sumExpense / (props.sumIncome + props.sumExpense);
  console.log(window.innerWidth);
  return (
    <Div>
      <Span
        color="#2e7d32"
        width={`${widthIncome * 1000}px`}
      >{`Income: ${currencyType}${props.sumIncome}`}</Span>

      <Span
        color="#c62828"
        width={`${widthExpense * 1000}px`}
      >{`Expense: ${currencyType} ${props.sumExpense}`}</Span>
    </Div>
  );
};

const Span = styled.span`
  color: white;
  background-color: ${(props) => props.color};
  /* margin-right: 6px; */
  padding: 4px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  border-radius: ${(props) =>
    props.color === "#2e7d32" ? "6px 0 0 6px" : "0 6px 6px 0"};
`;

const Div = styled.div`
  display: flex;
  height: 75px;
`;
