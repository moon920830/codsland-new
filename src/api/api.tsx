import axios from "axios";
import { setCookie, getCookie } from "../utils/cookie";
const url = "https://cods.land/api";

interface ApiResponse {
  data: {
    data: {
      token: string;
      fullname: string;
      email: string;
      membership: string;
    };
    status: string;
    error: string;
  };
}

export const SignIn = async (
  formData: any,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const response: ApiResponse = await axios.post(
      `${url}/auth/signin`,
      formData
    );
    if (response.data.status === "error") {
      enqueueSnackbar(response.data.error ? response.data.error : "Error", {
        variant: "error",
      });
    } else {
      const {
        data: {
          data: { token, fullname, email, membership },
        },
      } = response;
      console.log(token, fullname, email, membership);
      setCookie("token", token);
      setCookie("fullname", fullname);
      setCookie("email", email);
      setCookie("membership", JSON.stringify(membership));
      sessionStorage.setItem("userToken", token);
      enqueueSnackbar("Login Success", { variant: "success" });
      return token;
    }
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const ForgetPassword = async (
  email: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const response = await axios.post(`${url}/auth/forgot-password`, {
      email: email,
    });
    if (response.data.status == "error")
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    enqueueSnackbar("Success", { variant: "success" });
    return "success";
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const ResetPassword = async (
  otp: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const response = await axios.post(`${url}/auth/verify-otp`, { otp: otp });
    if (response.data.status == "error")
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    enqueueSnackbar("Success", { variant: "success" });
    return "success";
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const NewPassword = async (
  otp: string,
  password: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const response = await axios.post(`${url}/auth/reset-password`, {
      otp: otp,
      password: password,
    });
    if (response.data.status == "error")
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    enqueueSnackbar("Success", { variant: "success" });
    return "success";
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const Register = async (
  formData: any,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios.post(`${url}/auth/signup`, formData, config);
    console.log(response);
    if (response.data.status == "error")
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    enqueueSnackbar("Success", { variant: "success" });
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const StartPayment = async (
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const response = await axios.post(`${url}/members/start-payment`, {
      type: "2",
    });
    if (response.data.status == "error") {
      console.log(response.data);
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return response.data.data.clientSecret;
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

interface MemberType {
    phone: string,
    type: string,
    period: number
}

export const MemberSave = async (
    formData: MemberType,
    enqueueSnackbar: (message: string, options?: object) => void
  ) => {
    try {
      const token = getCookie('token')
      const response = await axios.post(`${url}/members/save`, 
        formData
      , {headers: {token:token}});
      if (response.data.status == "error") {
        return enqueueSnackbar(
          response.data.error ? response.data.error : "Error",
          { variant: "error" }
        );
      }
      enqueueSnackbar("Purchase Success", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };
