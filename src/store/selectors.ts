import { RootState } from './index';

export const selectEmail = (state: RootState) => state.otp.email;

export const selectOtp = (state: RootState) => state.otp.otp