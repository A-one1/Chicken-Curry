import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/env-vars";
import { useUser } from "../../authentication/use-auth";
import { Header, Container, Divider, Label, Table } from "semantic-ui-react";
import "./user-page.css";
import { useHistory } from "react-router-dom";
import { OrdersGetDto } from "../../constants/types";

export const OrderPage = () => {
  const user = useUser();

  const history = useHistory();

  const [orders, setOrders] = useState<OrdersGetDto[]>();

  const fetchOrder = async () => {
    const response = await axios.get(`${BaseUrl}/api/orders/`);
    if (response.data.hasErrors) {
      console.log(response.data.errors);
    }
    console.log("SUCCESS");
    console.log(response.data.data);
    setOrders(response.data.data);
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <Header>ORDER PAGE</Header>
      <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell class="collapsing">Order ID</Table.HeaderCell>
              <Table.HeaderCell>Customer Id</Table.HeaderCell>
              <Table.HeaderCell> Time</Table.HeaderCell>
              <Table.HeaderCell> Total</Table.HeaderCell>
              <Table.HeaderCell> Tip</Table.HeaderCell>

              <Table.HeaderCell> Status</Table.HeaderCell>
              <Table.HeaderCell> Type</Table.HeaderCell>


            </Table.Row>
          </Table.Header>
        </Table>

      {orders ? (
        orders.map((orders) => {
          return (
         
              
              <>
                <div className="row">
                  <Table fixed>
                    <Table.Body>
                      <Table.Row key={orders.id}>
                        <Table.Cell class="collapsing">

                          {orders.id}
                        </Table.Cell>
                        <Table.Cell> {orders.customer} </Table.Cell>
                        <Table.Cell> {orders.dateTime}</Table.Cell>
                        <Table.Cell> {orders.total}</Table.Cell>
                        <Table.Cell> {orders.tipAmount}</Table.Cell>

                        <Table.Cell> {orders.status}</Table.Cell>

                        <Table.Cell> {orders.type}</Table.Cell>

                     
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              </>
             
            );
        })
      ) : (
        <div>LOADING...</div>
      )}
    </div>
  );
};
