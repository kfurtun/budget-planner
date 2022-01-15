import * as React from "react";

import { LoginTemplate } from "../LoginTemplate";
import { ForgotPasswordPartial } from "./ForgotPasswordPartial";

export const ForgotPassword = () => {
  return (
    <LoginTemplate>
      <ForgotPasswordPartial />
    </LoginTemplate>
  );
};
