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

const BaseUrl = process.env.PUBLIC_URL;

const initialValues: MenuItemsCreateDto = {
  name: '',
  price: 0,
  discription: '',
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
      <Formik initialValues={ initialValues } onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name </label>
        
          <Field id="name" name="name">
            {({ field }) => (
              <>
                <Input {...field}></Input>{" "}
              </>
            )}
          </Field>
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
