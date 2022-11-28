import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppinCartContext";
import axios from "axios";
import { BaseUrl } from "../../constants/env-vars";
import { MenuItemsGetDto } from "../../constants/types";
import { Button, Card } from "semantic-ui-react";

type CartItemProps = {
  id: number;
  quantity: number;
  setTotal: Function;
  total: number;
};

export function CartItem({ id, quantity, setTotal, total }: CartItemProps) {
  const [menuItem, setMenuItem] = useState<MenuItemsGetDto>();
 // const[totalPrice, setTotalPrice]= useState();

  const { removeFromCart } = useShoppingCart();
  const fetchMenuItems = async () => {
    
     await axios
      .get(`${BaseUrl}/api/menuitems/` + id)
      .then((res) => {
        if (res.data.hasErrors) {
          res.data.errors.forEach((err) => {
            console.log(err.message);
          });
        } else {
          setMenuItem(res.data.data);
          
          total+=res.data.data.price * quantity
          setTotal(total);                                                                                                                                                    

        }
      });
  };
// function getTotalPrice():any{
//   let totalp=0;
//   menuItem.map(a:any)=>{
//     totalp+=a.price
//   }
// }
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      {menuItem && (
        <div>
          <Card.Group>
            <Card>
              <Card.Content className="center" style={{ display: "center" }}>
                <Card.Header>
                  {menuItem.name}
                  <span>
                    <Button
                      className="compact right floated tiny ui red icon  button"
                      onClick={() => {
                        removeFromCart(menuItem.id);
                        setTotal(total - menuItem.price * quantity)
                      }}
                    >
                      <i className="cancel icon"></i>
                    </Button>
                  </span>
                </Card.Header>
                x{quantity}
                <Card.Meta>${menuItem.price * quantity}</Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      )}
    </>
  );
}
