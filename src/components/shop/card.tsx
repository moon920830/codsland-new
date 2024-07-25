import React from "react";
import Description from "./description";

import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import DetailsIcon from "@mui/icons-material/Details";
import Tooltip from "@mui/material/Tooltip";

interface CardType {
  id: string;
  title: string;
  description: string;
  price: number;
}
const url = "https://cods.land/api/shop/products";
const ShopCard: React.FC<CardType> = (props) => {
  const handleAddCart = () => {
    console.log("hello");
  };
  return (
    <div className="shadow-2xl bg-gray-300 pt-10 pb-5 px-5 h-[550px] flex flex-col">
      <img
        src={`${url}/${props.id}/image`}
        alt="img"
        className="h-[250px] w-full"
      ></img>
      <div className="text-xl font-semibold text-[#2E3192] mt-2">
        {props.title}
      </div>
      <Description description={props.description} />
      <div className="flex">
        <Rating
          name="read-only"
          value={5}
          readOnly
          sx={{ marginTop: "10px" }}
        />
        <div className="ml-auto text-2xl font-extrabold text-[#2E3192] mt-2">
          ${props.price}
        </div>
      </div>
      <div className="ml-auto text-white mt-auto flex gap-5">
        <Tooltip title="See More Detail">
          <IconButton
            onClick={handleAddCart}
            sx={{
              backgroundColor: "#2E3192",
              "&:hover": {
                backgroundColor: "#1E1F60", // Replace this with the desired hover color
              },
            }}
          >
            <DetailsIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add to Cart">
          <IconButton
            onClick={handleAddCart}
            sx={{
              backgroundColor: "#2E3192",
              "&:hover": {
                backgroundColor: "#1E1F60", // Replace this with the desired hover color
              },
            }}
          >
            <AddShoppingCartIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ShopCard;
