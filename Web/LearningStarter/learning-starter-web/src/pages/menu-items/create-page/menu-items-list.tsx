import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-vars";
import { MenuItemsGetDto } from "../../../constants/types";

export const MenuItemListPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItemsGetDto[]>();

  const fetchMenuItems = async () => {
    const response = await axios.get(`${BaseUrl}/api/menuitems`);

    if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
      setMenuItems(response.data.data);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <>
      <div>
        {menuItems ? (
          menuItems.map((menuItems) => {
            return (
              <Segment>
                <div> Name: {menuItems.name};</div>
                <div>Price: {menuItems.price};</div>
                <div>Description: {menuItems.discription};</div>
              </Segment>
            );
          })
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    </>
  );
};
