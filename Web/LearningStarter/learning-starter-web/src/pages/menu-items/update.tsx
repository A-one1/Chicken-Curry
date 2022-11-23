import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import {
  ApiResponse,
  MenuItemsCreateDto,
  MenuItemsGetDto,
} from "../../constants/types";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../constants/env-vars";
import { routes } from "../../routes/config";
import { useHistory } from "react-router-dom";

export const UpdatePage = () => {
  const history = useHistory();

  // let match = useRouteMatch<{ id: string }>();
  const { id } = useParams();
 
  const [menuItems, setMenuItems] = useState<MenuItemsGetDto>();

  const fetchMenuItems = async () => {
    const response = await axios.get(`${BaseUrl}/api/menuitems/${id}`);
    if (response.data.hasErrors) {
      console.log(response.data.errors);
    }

    setMenuItems(response.data.data);
  };
  useEffect(() => {
    fetchMenuItems();
    console.log(menuItems);
  }, [id]);

  const onSubmit = async (values: MenuItemsCreateDto) => {
    const response = await axios.put<ApiResponse<MenuItemsGetDto>>(
      `${BaseUrl}/api/menuitems/${id}`,
      values
    );

    if (response.data.hasErrors) {
      alert("Cannot be empty");

      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.menuItems.update);
      alert("Item updated successfully");
    }
  };

  return (
    <>
      {menuItems && (
        <Formik initialValues={menuItems} onSubmit={onSubmit}>
          <Form>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name">
              {({ field }) => (
                <>
                  <Input {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /><br/>
            <label htmlFor="price">Price</label>
            <Field id="price" name="price">
              {({ field }) => (
                <>
                  <Input type="number" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br /><br/>
            <label htmlFor="description">Description</label>
            <Field id="description" name="description">
              {({ field }) => (
                <>
                  <Input className="large" {...field}></Input>{" "}
                </>
              )}
            </Field>
            <br/> <br/>
            <Button type="submit">Update</Button>
          </Form>
        </Formik>
      )}
    </>
  );
};
