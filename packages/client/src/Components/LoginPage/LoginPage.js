import * as React from "react";

import { LoginTemplate } from "../LoginTemplate";
import { LoginPartial } from "./LoginPartial";

export const LoginPage = () => {
  return (
    <LoginTemplate>
      <LoginPartial />
    </LoginTemplate>
  );
};
