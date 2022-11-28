import axios from "axios";
import React, { useEffect, useState } from "react";
import { Item, Segment } from "semantic-ui-react";
import { BaseUrl } from "../../constants/env-vars";
import { MenuItemsGetDto } from "../../constants/types";

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
      <div >
        {menuItems ? (
          menuItems.map((menuItems) => {
            return (
              //   <Segment>
              //     <div> Name: {menuItems.name};</div>
              //     <div>Price: {menuItems.price};</div>
              //     <div>Description: {menuItems.description};</div>
              // </Segment>

              <Item.Group>
                <Item>
                  <Item.Content>
                  <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                    <Item.Header>{menuItems.name}</Item.Header>
                    <Item.Meta>
                      <span className="price">${menuItems.price}</span>
                    </Item.Meta>
                    <Item.Description>{menuItems.description}</Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            );
          })
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    </>
  );
};
