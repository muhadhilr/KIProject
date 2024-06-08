import React, { useState } from "react";
import Button from "./Button";

const CardMenu = ({ menu, onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    onAdd(menu.id);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onRemove(menu.id);
    }
  };

  const formatPrice = (price) => {
    if (price >= 1000 && price < 1000000) {
      const formattedPrice = (price / 1000).toFixed(1);
      return formattedPrice.endsWith(".0")
        ? formattedPrice.slice(0, -2) + "K"
        : formattedPrice + "K";
    }
    return price;
  };

  return (
    <div className="max-w-[224px] flex flex-col shadow-sm rounded-xl  ">
      <img
        className=" object-cover w-full h-full rounded-t-xl"
        src={menu.picture}
        alt={menu.name + "src: pinterest"}
      />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 ">{menu.name}</h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          Harga: {formatPrice(menu.price)}
        </p>
        <div className="flex justify-between items-center mt-3">
          <Button
            onClick={handleRemove}
            className="px-1 py-1  text-white rounded-full max-w-8 text-center"
          >
            -
          </Button>
          <span className="">{quantity}</span>
          <Button
            onClick={handleAdd}
            className="px-1  py-1  bg-green-500 text-white rounded-full max-w-8 max-h-8 text-center"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
