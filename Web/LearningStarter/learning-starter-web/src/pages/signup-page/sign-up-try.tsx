import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
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
export const RegisterPage1 = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //setIsSubmit(true);

    console.log(formValues);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    console.log("button clicked");
  };

  useEffect(() => {
    if (formValues.firstName) {
      setFormErrors({ ...formErrors, firstName: "" });
    }
    // if (formValues.lastName) {
    //   setFormErrors({ ...formErrors, lastName: "" });
    // }
    // if (formValues.userName) {
    //   setFormErrors({ ...formErrors, userName: "" });
    // }
    // if (formValues.password) {
    //   setFormErrors({ ...formErrors, password: "" });
    // }
    // if (formValues.address) {
    //   setFormErrors({ ...formErrors, address: "" });
    // }
    // if (formValues.zipCode) {
    //   setFormErrors({ ...formErrors, zipCode: undefined as any });
    // }
    // if (formValues.phoneNumber) {
    //   setFormErrors({ ...formErrors, phoneNumber: "" });
    // }
    // else if (Object.keys(formErrors).length === 0 && isSubmit) {
    // }
  }, [formValues]);

  const validate = (values) => {
    const errors:String[] = [];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      setFormErrors({ ...formErrors, firstName: "First Name is required!" });
      errors.push("First Name error");
    }
    // if (!values.lastName) {
    //   setFormErrors({ ...formErrors, lastName: "Last Name is required!" });

    //   // } else if (!regex.test(values.email)) {
    //   //   errors.email = "This is not a valid email format!";
    // }
    // if (!values.Username) {
    //   setFormErrors({ ...formErrors, userName: "User Name is required!" });
    // }
    // if (!values.password) {
    //   setFormErrors({ ...formErrors, password: "Password is required!" });
    // }
    // if (values.password.length < 4) {
    //   setFormErrors({ ...formErrors, password: "Password Invalid!" });
    // }
    // if (values.password.length > 10) {
    //   setFormErrors({
    //     ...formErrors,
    //     password: "Password cannot exceed more than 10 characters",
    //   });
    //}
    return errors;
  };

  const onSubmit = async (values: userCreateDto) => {
    if (validate(formValues).length == 0) {
      const response = await axios.post<ApiResponse<userCreateDto>>(
        `${BaseUrl}/api/users`,
        values,
        {
          validateStatus: () => true,
        }
      );

      if (response.data.hasErrors) {
        console.log(response.data.errors);
      } else {
        history.push(routes.home);
        alert("User created successfully");
      }
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="ui form" autoComplete="off">
          <div>
            <pre>{JSON.stringify(formValues, undefined, 2)} </pre>
            <Grid centered>
              <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
                <Header textAlign="center">Create a new account</Header>

                <Segment>
                  <div className="field">
                    <label>It's quick and easy</label>
                    <div className="two fields">
                      <div className="field">
                        {/* <Field id="firstName" name="firstName">
                          {({ field }) => (
                            <>
                              <Input
                              value={formValues.firstName}
                              onChange={handleChange}
                                placeholder="First Name"
                                {...field}
                              />
                            </>
                          )}
                        </Field> */}
                        <div className="field">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <p>{formErrors.firstName}</p>
                      </div>
                      <div className="field">
                        <Field id="lastName" name="lastName">
                          {({ field }) => (
                            <>
                              <Input
                                value={formValues.lastName}
                                placeholder="Last Name"
                                onChange={handleChange}
                                {...field}
                              ></Input>{" "}
                            </>
                          )}
                        </Field>
                      </div>
                      <p>{formErrors.lastName}</p>
                    </div>
                  </div>
                  <div className="field">
                    <Field id="userName" name="userName">
                      {({ field }) => (
                        <>
                          <Input
                            value={formValues.userName}
                            placeholder="Username"
                            {...field}
                          ></Input>{" "}
                        </>
                      )}
                    </Field>
                  </div>
                  <p>{formErrors.userName}</p>
                  <div className="field">
                    <Field id="password" name="password">
                      {({ field }) => (
                        <>
                          <Input
                            value={formValues.password}
                            placeholder="password"
                            type="password"
                            {...field}
                          ></Input>
                        </>
                      )}
                    </Field>
                  </div>
                  <p>{formErrors.password}</p>
                  <div className="two fields">
                    <div className="field">
                      <Field id="address" name="address">
                        {({ field }) => (
                          <>
                            <Input
                              value={formValues.address}
                              placeholder="Address "
                              {...field}
                            ></Input>{" "}
                          </>
                        )}
                      </Field>
                    </div>
                    <p>{formErrors.address}</p>
                    <div className="field">
                      <Form>
                        <Field id="zipCode" name="zipCode">
                          {({ field }) => (
                            <>
                              <Input
                                value={formValues.zipCode}
                                maxLength={5}
                                type="number"
                                placeholder="Zipcode"
                                {...field}
                              ></Input>
                            </>
                          )}
                        </Field>
                      </Form>
                    </div>
                    <p>{formErrors.zipCode}</p>
                  </div>
                  <div>
                    <Field id="phoneNumber" name="phoneNumber">
                      {({ field }) => (
                        <>
                          <Input
                            value={formValues.zipCode}
                            placeholder="Phone Number"
                            {...field}
                          ></Input>
                        </>
                      )}
                    </Field>
                  </div>
                  <p>{formErrors.phoneNumber}</p>
                  <br></br>
                  <div>
                    <Button disabled={!validate} color="green" type="submit">
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
