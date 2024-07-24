// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import otpReducer, { OtpState } from './otpSlice';

const store = configureStore({
  reducer: {
    otp: otpReducer,
  },
});

export type RootState = {
  otp: OtpState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
