import React from "react";

import Description from "./description";

import Rating from "@mui/material/Rating";

interface CartCardType {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
}

const url = "https://cods.land/api/shop/products";

const CartCard: React.FC<CartCardType> = (props) => {
  return (
    <div className="shadow-2xl bg-gray-300 py-5 px-5 grid grid-cols-5 gap-5">
      <div className="col-span-1">
        <img
          src={`${url}/${props.id}/image`}
          alt="img"
          className="h-[150px] w-[150px]"
        />
      </div>
      <div className="col-span-3">
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
      <div className="col-span-1"></div>
    </div>
  );
};

export default CartCard;
