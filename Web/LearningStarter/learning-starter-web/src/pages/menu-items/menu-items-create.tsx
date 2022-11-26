import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input, Label, TextArea } from "semantic-ui-react";
import {
  ApiResponse,
  MenuItemsGetDto,
  MenuItemsCreateDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/env-vars";

const initialValues: MenuItemsCreateDto = {
  name: undefined as any,
  price: undefined as any,
  description: undefined as any,
};

export const MenuItemsCreatePage = () => {
  const history = useHistory();
  const onSubmit = async (values: MenuItemsCreateDto) => {
    const response = await axios.post<ApiResponse<MenuItemsGetDto>>(
      `${BaseUrl}/api/menuitems`,
      values
    );

    if (response.data.hasErrors) {
     console.log(response.data.errors);
    } else {
      history.push(routes.menuItems.list);
      alert("Item created successfully");
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <h1> CREATE MENU ITEMS </h1>
            <Label htmlFor="name">Name </Label>
            <Field id="name" name="name">
              {({ field }) => (
                <>
                  <Input placeholder="Special Sushi" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /> <br />
            <Label htmlFor="price">Price</Label>
            <Field id="price" name="price">
              {({ field }) => (
                <>
                  <Input type= "number" placeholder="$$$" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /> <br />
            <Label htmlFor="description">Description</Label>
            <br/>
            <Field id="description" name="description">
              {({ field }) => (
                <>
                <TextArea
                    rows="3"
                    placeholder="Sweet $ Spicy"
                    style={{ width: "500px", height: "100px" }}
                    {...field}
                  ></TextArea>{" "}
                </>
              )}
            </Field>
            <br /> <br />
          </div>
          <div>
            <Button className="ui positive basic button" type="submit">Create</Button>
          </div>
          
        </Form>
      </Formik>
    </>
  );
};
