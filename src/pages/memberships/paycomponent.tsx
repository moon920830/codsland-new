import React, { useState, useEffect } from "react";
import { MemberSave } from "../../api/api";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

interface PropsType {
  checkValidation: () => boolean;
  handlePurchase: (result: any) => void;
  phone: string;
}

const PayComponent: React.FC<PropsType> = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!props.checkValidation()) {
      return;
    }
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: "http://localhost:3000",
      // },
      redirect: "if_required",
    });
    if (result.error) {
      const { error } = result;
      if (error.type === "card_error" || error.type === "validation_error") {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("An unexpected error occurred.", {
          variant: "error",
        });
      }
    } else {
    //   enqueueSnackbar("Purchase Success", { variant: "success" });
      console.log(result);
      props.handlePurchase(result);
      const phone = props.phone;
      const formData = { phone, type: 'annual', period: 365 };
      MemberSave(formData, enqueueSnackbar)

    }
  };
  const paymentElementOptions = {
    layout: "tabs" as const, // This ensures the type is correct
  };
  return (
    <form
      id="payment-form"
      className="mt-5 text-center"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions}/>
      <Button
        type="submit"
        sx={{
          marginTop: "40px",
          backgroundColor: "#2E3192",
          color: "white",
          borderRadius: "15px",
        }}
        id="submit"
        variant="contained"
      >
        Pay now
      </Button>
    </form>
  );
};

export default PayComponent;
