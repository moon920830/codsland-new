// store/otpSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OtpState {
  otp: string;
  email: string;
}

const initialState: OtpState = {
  otp: "",
  email: "",
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { setOtp, setEmail } = otpSlice.actions;
export default otpSlice.reducer;
