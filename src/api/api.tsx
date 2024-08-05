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
  phone: string;
  type: string;
  period: number;
}

export const MemberSave = async (
  formData: MemberType,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(`${url}/members/save`, formData, {
      headers: { token: token },
    });
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

export const GetCategory = async (
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.get(`${url}/shop/categories`, {
      headers: { token: token },
    });
    if (response.data.status == "error") {
      if (response.data.error == "NOT_MEMBER") {
        enqueueSnackbar("Purchase membership please", {
          variant: "error",
        });
        return "error";
      } else if (response.data.status == "EXPIRED") {
        enqueueSnackbar(
          "Membership expired. Please purchase membership again.",
          { variant: "error" }
        );
        return "error";
      } else {
        enqueueSnackbar(response.data.error ? response.data.error : "Error", {
          variant: "error",
        });
        return "error";
      }
    } else {
      return response.data.data;
    }
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const GetProductsByCategory = async (
  page: number,
  rowsPerPage: number,
  categoryId: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/shop/categories/${categoryId}/products/page`,
      {
        page: page,
        pagesize: rowsPerPage,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    console.log(response.data.data);
    return {
      pagedata: response.data.data.pagedata,
      page: response.data.data.page,
      total: response.data.data.total,
      totalNumbers: response.data.data.totalNumbers,
      pagesize: response.data.data.pagesize,
    };
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const GetProductsAll = async (
  page: number,
  rowsPerPage: number,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/shop/products/page`,
      {
        page: page,
        pagesize: rowsPerPage,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return {
      pagedata: response.data.data.pagedata,
      page: response.data.data.page,
      total: response.data.data.total,
      totalNumbers: response.data.data.totalNumbers,
      pagesize: response.data.data.pagesize,
    };
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const AddToCart = async (
  productId: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/shop/cart`,
      {
        product: productId,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    const count_response = await axios.get(`${url}/shop/cart/count`, {
      headers: { token: token },
    });
    if (count_response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    enqueueSnackbar("Successfully Added to the Cart", { variant: "success" });
    return count_response.data.data;
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const GetCartCount = async (
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const count_response = await axios.get(`${url}/shop/cart/count`, {
      headers: { token: token },
    });
    if (count_response.data.status == "error") {
      return enqueueSnackbar(
        count_response.data.error ? count_response.data.error : "Error",
        { variant: "error" }
      );
    }
    return count_response.data.data;
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const GetShopCart = async (
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.get(`${url}/shop/cart`, {
      headers: { token: token },
    });
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const HandleProductCount = async (
  productId: string,
  count: number,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/shop/cart/${productId}/count`,
      {
        count: count,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return "success";
  } catch (error) {
    enqueueSnackbar("Network Error", { variant: "error" });
  }
};

export const HandlePurchase = async (
  email: string,
  phone: string,
  date: Date | null,
  location: string,
  street: string,
  city: string,
  state: string,
  country: string,
  zip: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/shop/orders/save`,
      {
        email,
        phone,
        date,
        location,
        street,
        city,
        state,
        country,
        zip,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      console.log("hello");
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    enqueueSnackbar("Please Enter Your Correct Address", { variant: "error" });
    return "error";
  }
};

export const PutSelectRate = async (
  order_id: string,
  param_rate: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.put(
      `${url}/shop/orders/shipment`,
      {
        order_id: order_id,
        rate: param_rate,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      console.log("hello");
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return "success";
  } catch (error) {}
};

export const GetOrders = async (
  id: string,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.get(`${url}/shop/orders/${id}`, {
      headers: { token: token },
    });
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    const data = response.data.data;
    let rate_from_back;
    if (data.shipping_rate !== null && data.shipping_rate !== undefined) {
      rate_from_back = data.shipping_rate;
    } else {
      rate_from_back = data.shipping_info.rates[0];
      PutSelectRate(id, rate_from_back, enqueueSnackbar);
    }
    return { shippingInfo: data.shipping_info, rateFromBack: rate_from_back };
  } catch (error) {
    enqueueSnackbar("NetWork Error", { variant: "error" });
  }
};

export const CreatePaymentIntent = async (
  total: number,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/test/create-payment-intent`,
      {
        amount: total * 100,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return response.data.clientSecret;
  } catch (error) {
    enqueueSnackbar("NetWork Error", { variant: "error" });
  }
};

export const OrderPurchase = async (
  id: string,
  result: any,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/test/create-payment-intent`,
      {
        result,
        order: id,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    enqueueSnackbar("Successfully Purchase", { variant: "success" });
  } catch (error) {
    enqueueSnackbar("NetWork Error", { variant: "error" });
  }
};

export const GetAppointsAndEvents = async (
  range: any,
  enqueueSnackbar: (message: string, options?: object) => void
) => {
  try {
    const token = getCookie("token");
    const response = await axios.post(
      `${url}/appointments/calendar`,
      {
        range,
      },
      {
        headers: { token: token },
      }
    );
    if (response.data.status == "error") {
      return enqueueSnackbar(
        response.data.error ? response.data.error : "Error",
        { variant: "error" }
      );
    }
    return response.data.data.events;
  } catch (error) {
    enqueueSnackbar("NetWork Error", { variant: "error" });
  }
};
