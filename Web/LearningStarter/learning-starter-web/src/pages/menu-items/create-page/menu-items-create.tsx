import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input } from "semantic-ui-react";
import {
  ApiResponse,
  MenuItemsGetDto,
  MenuItemsCreateDto,
} from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/env-vars";

const initialValues: MenuItemsCreateDto = {
  name: "",
  price: undefined as any,
  description: "",
};

export const MenuItemsCreatePage = () => {
  const history = useHistory();
  const onSubmit = async (values: MenuItemsCreateDto) => {
    const response = await axios.post<ApiResponse<MenuItemsGetDto>>(
      `${BaseUrl}/api/menuitems`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.home);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <h1> CREATE MENU ITEMS </h1>
            <label htmlFor="name" >Name </label>
            
            <Field id="name" name="name" >
              {({ field }) => (
                <>
                  <Input placeholder="Special Sushi" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /> <br />
            <label htmlFor="price" >Price</label>
            <Field id="price" name="price">
              {({ field }) => (
                <>
                  <Input type="number" placeholder="$$$" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /> <br />
            <label htmlFor="description">Description</label>
            <Field id="description" name="description" >
              {({ field }) => (
                <>
                  <Input placeholder="Describe " {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /> <br />
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
