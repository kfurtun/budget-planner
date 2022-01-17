import { atom } from "recoil";

export const loggedInUserState = atom({
  key: "loggedInUserState",
  default: {
    email: "",
    id: "",
    name: "",
  },
});

export const selectedMonthAndYearToDisplay = atom({
  key: "selectedMonthAndYearToDisplay",
  default: {
    month: "",
    year: "",
  },
});

export const userData = atom({
  key: "userData",
  default: [],
});

export const currency = atom({
  key: "currency",
  default: "$",
});

export const triggerFetchState = atom({
  key: "triggerFetch",
  default: false,
});
