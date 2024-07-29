import React, { useEffect, useState } from "react";

import { GetShopCart } from "../../api/api";
import { useSnackbar } from "notistack";
import CartCard from "../../components/shop/cart-card";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Check products in cart",
  "Enter you detail",
  "Select your shipment plan",
  "Approve & Finish",
];

interface Product {
    count: number,
    product: {
        _id: string,
        title: string,
        description: string,
        price: number
    }
}

const Cart: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const GetCartProducts = async () => {
      const result = await GetShopCart(enqueueSnackbar);
      setProducts(result)
    };
    GetCartProducts();
  }, []);

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
    <div className="px-[100px] pt-[150px]">
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
          {activeStep === 0 ? <div className="flex flex-col space-y-10 mt-5">
            {products.length > 0 ? (
            products.map((product) => (
              <div key={product.product._id}>
                <CartCard
                  id={product.product._id}
                  title={product.product.title}
                  description={product.product.description}
                  price={product.product.price}
                  count={product.count}
                />
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
          </div> : <></>}
          <div className="flex pt-5">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              variant="contained"
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
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
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
