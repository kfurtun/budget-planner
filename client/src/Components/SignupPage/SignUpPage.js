import * as React from "react";

import { LoginTemplate } from "../LoginTemplate";
import { SignUpPartial } from "./SignUpPartial";

export const SignUpPage = () => {
  return (
    <LoginTemplate>
      <SignUpPartial />
    </LoginTemplate>
  );
};
