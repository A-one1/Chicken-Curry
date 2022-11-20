import { useShoppingCart } from "../../context/ShoppinCartContext";
import axios from "axios";
import { BaseUrl } from "../../constants/env-vars";
import { MenuItemsGetDto } from "../../constants/types";
import React, { useEffect, useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const [menuItem, setMenuItem] = useState<MenuItemsGetDto>();

  const { removeFromCart } = useShoppingCart();
  const fetchMenuItems = async () => {
    const response = await axios.get(`${BaseUrl}/api/menuitems/` + id);

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setMenuItem(response.data.data);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return <>{menuItem && <span>{menuItem.name}</span>}</>;
}
