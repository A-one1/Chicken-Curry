import axios from "axios";
import { Form, Field, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Input, Segment } from "semantic-ui-react";
import { useUser } from "../../authentication/use-auth";
import { BaseUrl } from "../../constants/env-vars";
import { useHistory } from "react-router-dom";

import { useParams } from "react-router-dom";
import {
  ApiResponse,
  OrdersCreateDto,
  UserGetDto,
} from "../../constants/types";
import { useEffectOnce } from "react-use";
import { routes } from "../../routes/config";

const initialValues: OrdersCreateDto = {
  customer: undefined as any, //customer id
  dateTime: undefined as any,
  total: undefined as any,
  tipAmount: undefined as any,
  status: undefined as any, //cooking, ready, out for delivery
  type: undefined as any,
  customerComments: undefined as any,
};

const current = new Date();

export const Checkout = () => {
  const [users, setUsers] = useState<UserGetDto>();
  const [customerId, setCustomerId] = useState(0);
  const [date] = useState(current.toUTCString());
  const [total, setTotal] = useState(0);

  const user = useUser();
  //const { id } = useParams();
  const history = useHistory();

  const fetchMenuItems = async () => {
    const response = await axios.get(`${BaseUrl}/api/users/${user.id}`);
    if (response.data.hasErrors) {
      console.log(response.data.errors);
    }
    console.log("SUCCESS");
    setUsers(response.data.data);
    setCustomerId(response.data.data.id);
  };

  const onSubmit = async (values: OrdersCreateDto) => {
    values.dateTime = date;
    values.total = total;
    values.customer = customerId;
    const response = await axios.post<ApiResponse<OrdersCreateDto>>(
      `${BaseUrl}/api/orders`,
      values
    );
    if (response.data.hasErrors) {
      console.log(response.data.errors);
    } else {
      console.log("SUCCESS");
      alert("Order placed successfully");
      history.push(routes.home);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice") || "{}");
    setTotal(totalPrice);
  }, []);
  return (
    <>
      <div> {current.toUTCString}</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        <Form className="ui centered form">
          <div>
            <Grid centered>
              <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                <Header textAlign="center">Check out</Header>

                <Segment>
                  <div className="field">
                    <label> </label>
                    <div className="field">
                      <Field
                        id="customer"
                        name="customer"
                        value={customerId}
                      ></Field>
                    </div>

                    <div className="two fields">
                      <div className="field">
                        <Field id="total" name="total" value={total}></Field>
                      </div>
                      <div className="field">
                        <Field id="tipAmount" name="tipAmount">
                          {({ field }) => (
                            <>
                              <Input
                                type="number"
                                placeholder="Tip Amount"
                                {...field}
                              ></Input>{" "}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <Field id="status" name="status">
                      {({ field }) => (
                        <>
                          <Input
                            type="number"
                            placeholder="status"
                            {...field}
                          ></Input>{" "}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="field">
                    <Field id="type" name="type">
                      {({ field }) => (
                        <>
                          <Input
                            type="number"
                            placeholder="type"
                            {...field}
                          ></Input>
                        </>
                      )}
                    </Field>
                  </div>

                  <div className="field">
                    <Field id="customerComments" name="customerComments">
                      {({ field }) => (
                        <>
                          <Input
                            type="text"
                            placeholder="Comments "
                            {...field}
                          ></Input>
                        </>
                      )}
                    </Field>
                  </div>

                  <br></br>
                  <div>
                    <Button color="green" type="submit">
                      Check Out
                    </Button>
                  </div>

                  {/* <Segment>
                      <Link to="/auth/login">Already have an account?</Link>
                    </Segment> */}
                </Segment>
              </Grid.Column>
            </Grid>
            <br /> <br />
          </div>
        </Form>
      </Formik>
    </>
  );
};
