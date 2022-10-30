import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { ApiResponse, MenuItemsGetDto } from "../../constants/types";
import { useRouteMatch } from "react-router-dom";


export const MenuItemsUpdatePage = () => {
  let match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const [menuItems,setMenuItems] = useState<MenuItemsGetDto>();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await axios.put<ApiResponse<MenuItemsGetDto>>(
        `api/menuitems/${id}`
      );
        if(response.data.hasErrors){
            console.log(response.data.errors);
        }

    };
    fetchMenuItems();

  }, [id]);

  return (
    <>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <Field id="name" name="name">
            {({ field }) => (
              <>
                <Input type="name" placeholder="Biryani" {...field}></Input>{" "}
              </>
            )}
          </Field>

          <div>
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
