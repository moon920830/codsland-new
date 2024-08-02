import React, { useState, Dispatch, SetStateAction } from "react";

import Description from "./description";
import { HandleProductCount } from "../../api/api";
import { useSnackbar } from "notistack";

import Rating from "@mui/material/Rating";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

interface CartCardType {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
  productId: string;
  totalPrice: number;
  setTotalPrice:  Dispatch<SetStateAction<number>>;
}

const url = "https://cods.land/api/shop/products";

const CartCard: React.FC<CartCardType> = (props) => {
  const [count, setCount] = useState(props.count);
  const { enqueueSnackbar } = useSnackbar();
  const handleMinus = async () => {
    const new_count = count - 1;
    const result = await HandleProductCount(
      props.id,
      new_count,
      enqueueSnackbar
    );
    if (result === "success") {
      setCount(new_count);
      props.setTotalPrice(props.totalPrice - props.price)
    }
  };

  const handlePlus = async () => {
    const new_count = count + 1;
    const result = await HandleProductCount(
      props.id,
      new_count,
      enqueueSnackbar
    );
    if (result === "success") {
      setCount(new_count);
      props.setTotalPrice(props.totalPrice + props.price)
    }
  };

  return (
    <div className="shadow-2xl py-5 px-5 grid lg:grid-cols-5 gap-5">
      <div className="lg:col-span-1">
        <img
          src={`${url}/${props.productId}/image`}
          alt="img"
          className="h-[150px] w-[150px] m-auto"
        />
      </div>
      <div className="lg:col-span-3">
        <div className="text-xl font-semibold text-[#2E3192] mt-2 w-full">
          {props.title}
        </div>
        <Description description={props.description} />
        <Rating
          name="read-only"
          value={5}
          readOnly
          sx={{ marginTop: "10px" }}
        />
      </div>
      <div className="lg:col-span-1 flex flex-row items-center lg:flex-col">
        <DeleteForeverIcon
          sx={{ color: "#2E3192", marginLeft: "auto", cursor: "pointer" }}
        />
        <div className="text-xl font-semibold text-[#2E3192] lg:mt-2 ml-auto">
          price: ${props.price}
        </div>
        <div className="text-xl font-semibold text-[#2E3192] lg:mt-2 ml-auto">
          ${props.price * props.count}
        </div>
        <div className="text-xl font-semibold text-[#2E3192] lg:mt-auto ml-auto flex flex-row gap-2 items-center">
          <IconButton
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "#2E3192",
              "&:hover": {
                backgroundColor: "#1E1F60", // Replace this with the desired hover color
              },
            }}
            onClick={handleMinus}
          >
            <RemoveIcon sx={{ color: "white", width: "16px" }} />
          </IconButton>
          <div>{count}</div>
          <IconButton
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "#2E3192",
              "&:hover": {
                backgroundColor: "#1E1F60", // Replace this with the desired hover color
              },
            }}
            onClick={handlePlus}
          >
            <AddIcon sx={{ color: "white", width: "16px" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
