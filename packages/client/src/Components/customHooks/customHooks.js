import React from "react";
import { ApiUrl } from "../../Constants";

export const useDataSorter = (array) => {
  array.sort(function (a, b) {
    if (a.Year !== b.Year) {
      return b.Year - a.Year;
    } else if (a.Year === b.Year && a.Month !== b.Month) {
      return b.Month - a.Month;
    } else {
      return b.Day - a.Day;
    }
  });
};

export const useDataFetch = (setData, triggerFetch, userId) => {
  React.useEffect(() => {
    fetch(`${ApiUrl}/onlineUser?id=` + userId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("yanlis username password");
        }
      })
      .then((userData) => setData(userData));
  }, [setData, triggerFetch, userId]);
};
