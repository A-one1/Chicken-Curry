import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Item,
  MenuItem,
  Segment,
} from "semantic-ui-react";
import { BaseUrl } from "../../constants/env-vars";
import { MenuItemsGetDto } from "../../constants/types";
import { useShoppingCart } from "../../context/ShoppinCartContext";

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

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  return (
    <>
      <Card.Group itemsPerRow={4} centered>
        {menuItems ? (
          menuItems.map((menuItems) => {
            const quantity = getItemQuantity(menuItems.id);

            return (
              <Card>
                <CardContent>
                  <Card.Header>{menuItems.name}</Card.Header>
                  <Card.Meta> ${menuItems.price}</Card.Meta>
                  <Card.Description>{menuItems.description} </Card.Description>
                </CardContent>
                <Card.Content>
                  <div className="mt-auto">
                    {quantity === 0 ? (
                      <Button
                        basic
                        color="green"
                        small
                        onClick={() => increaseCartQuantity(menuItems.id)}
                      >
                        + Add to Cart
                      </Button>
                    ) : (
                      <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: "2rem" }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ gap: "2rem" }}
                        >
                          <Button
                          className="tiny floated"
                          
                            onClick={() => decreaseCartQuantity(menuItems.id)}
                          >
                            -
                          </Button>
                          <span className="fs-3">{quantity}</span> in cart 
                          <Button
                          className="tiny floated"
                            onClick={() => increaseCartQuantity(menuItems.id)}
                          >
                            +
                          </Button>
                        </div>
                        <br></br>
                        <Button
                          onClick={() => removeFromCart(menuItems.id)}
                          className="negative"
                          size="small"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Content>
              </Card>
            );
          })
        ) : (
          <div>LOADING...</div>
        )}
      </Card.Group>
    </>
  );
};
