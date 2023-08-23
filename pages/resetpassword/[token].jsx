import OnboardingWrapper from "@/component/onboarding/OnboardingWrapper";
import ResetPassword from "@/component/onboarding/ResetPassword";
import { useRouter } from "next/router";
import React from "react";

const Resetpassword = () => {
  return (
    <div>
      <OnboardingWrapper>
        <ResetPassword type="user" />
      </OnboardingWrapper>
    </div>
  );
};

export default Resetpassword;
