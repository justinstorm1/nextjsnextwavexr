import { convexAuth } from "@convex-dev/auth/server";
import { Password } from '@convex-dev/auth/providers/Password'
import Resend from '@auth/core/providers/resend'
import { ResendOTP } from "./otp/ResendOTP";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password,
    ResendOTP,
  ],
});
