import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid, Header, Input, Segment } from "semantic-ui-react";
import { ApiResponse, userCreateDto } from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/env-vars";
import { Link } from "react-router-dom";

const initialValues: userCreateDto = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  phoneNumber: "",
  address: "",
  zipCode: undefined as any,
};

export const RegisterPage = () => {
  const history = useHistory();
  const onSubmit = async (values: userCreateDto) => {
    console.log("clicked")
    const response = await axios.post<ApiResponse<userCreateDto>>(
      `${BaseUrl}/api/users`,
      values,
      { validateStatus: () => true }
    );

    if (response.data.hasErrors) {
      console.log(response.data.errors);
    } else {
      history.push(routes.home);
      alert("User created successfully");
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="ui form">
          <div>
            <Grid centered>
              <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                <Header textAlign="center">Create a new account</Header>

                <Segment>
                  <div className="field">
                    <label>It's quick and easy</label>
                    <div className="two fields">
                      <div className="field">
                        <Field id="firstName" name="firstName">
                          {({ field }) => (
                            <>
                              <Input
                                placeholder="First Name"
                                {...field}
                              ></Input>{" "}
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="field">
                        <Field id="lastName" name="lastName">
                          {({ field }) => (
                            <>
                              <Input placeholder="Last Name" {...field}></Input>{" "}
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <Field id="userName" name="userName">
                      {({ field }) => (
                        <>
                          <Input placeholder="Username" {...field}></Input>{" "}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="field">
                    <Field id="password" name="password">
                      {({ field }) => (
                        <>
                          <Input
                            placeholder="password"
                            type="password"
                            {...field}
                          ></Input>
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <Field id="address" name="address">
                        {({ field }) => (
                          <>
                            <Input placeholder="Address " {...field}></Input>{" "}
                          </>
                        )}
                      </Field>
                    </div>
                    <div className="field">
                      <Form>
                        <Field id="zipCode" name="zipCode">
                          {({ field }) => (
                            <>
                              <Input
                                type="number"
                                placeholder="Zipcode"
                                {...field}
                              ></Input>
                            </>
                          )}
                        </Field>
                      </Form>
                    </div>
                  </div>
                  <div>
                    <Field id="phoneNumber" name="phoneNumber">
                      {({ field }) => (
                        <>
                          <Input placeholder="Phone Number" {...field}></Input>
                        </>
                      )}
                    </Field>
                  </div>
                  <br></br>
                  <div>
                    <Button color="green" type="submit">
                      Register
                    </Button>
                  </div>

                  <Segment>
                    <Link to="/auth/login">Already have an account?</Link>
                  </Segment>
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
