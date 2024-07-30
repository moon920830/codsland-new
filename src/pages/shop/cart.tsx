import React, { useEffect, useState } from "react";

import { GetShopCart } from "../../api/api";
import { useSnackbar } from "notistack";
import CartCard from "../../components/shop/cart-card";
import PhoneInput from "react-phone-input-2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";

const steps = [
  "Check products in cart",
  "Enter you detail",
  "Select your shipment plan",
  "Approve & Finish",
];

interface Product {
  _id: string;
  count: number;
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
  };
}

const Cart: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("0000-00-00"));
  const [address, setAddress] = useState("");

  useEffect(() => {
    const GetCartProducts = async () => {
      const result = await GetShopCart(enqueueSnackbar);
      setProducts(result);
    };
    GetCartProducts();
  }, []);

  useEffect(() => {
    // Calculate total price whenever products change
    const calculateTotalPrice = () => {
      const total = products.reduce(
        (acc, product) => acc + product.product.price * product.count,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [products]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

 const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const isStepOptional = (step: number) => {
    return step === 5;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="px-[100px] pt-[150px] pb-[50px]">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <div className="flex mt-5">
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="flex flex-row pt-5 mt-5 items-center">
            <div
              className={`text-2xl font-extrabold text-[#2E3192] mt-2 ${
                activeStep != 0 ? "hidden" : ""
              }`}
            >
              Total Price: ${totalPrice}
            </div>
            <div className="flex ml-auto flex-row space-x-5">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                sx={{ marginLeft: "auto" }}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ backgroundColor: "#2E3192" }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <div className="flex flex-col space-y-10 mt-10">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.product._id}>
                          <CartCard
                            id={product._id}
                            title={product.product.title}
                            description={product.product.description}
                            price={product.product.price}
                            count={product.count}
                            productId={product.product._id}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                          />
                        </div>
                      ))
                    ) : (
                      <div>No products available</div>
                    )}
                  </div>
                );
              case 1:
                return (
                  <div className="shadow-2xl bg-white py-5 px-5 mt-10 w-[600px] m-auto rounded-lg">
                    <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Email
                      </InputLabel>
                      <Input
                        id="name"
                        onChange={handleEmailChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility">
                              <EmailIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <div
                      style={{
                        width: "95%",
                        marginTop: "20px",
                        marginLeft: "5px",
                      }}
                    >
                      <PhoneInput
                        country={"us"}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputStyle={{ width: "100%", height: '45px' }}
                      />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "95%", marginTop: "20px", marginLeft: '5px' }}
                        label="order date"
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, width: "95%", marginTop: '20px' }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-password">
                        Address
                      </InputLabel>
                      <Input
                        id="address"
                        onChange={handleAddressChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility">
                              <EmailIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                );
              case 2:
                return <div>Step 2 Content</div>;
              case 3:
                return <div>Step 3 Content</div>;
              default:
                return null;
            }
          })()}
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
