import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Header, Input, Label, TextArea } from "semantic-ui-react";
import {
  ApiResponse,
  MenuItemsCreateDto,
  MenuItemsGetDto,
  UserCreateDto,
  UserGetDto,
} from "../../constants/types";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../constants/env-vars";
import { routes } from "../../routes/config";
import { useHistory } from "react-router-dom";
import { useUser } from "../../authentication/use-auth";
import "./user-page.css";


export const UserPage = () => {
  const user = useUser();

  const history = useHistory();

  const { id } = useParams();

  const [menuItems, setMenuItems] = useState<UserGetDto>();

  const fetchUser = async () => {
    const response = await axios.get(`${BaseUrl}/api/users/${user.id}`);
    if (response.data.hasErrors) {
      console.log(response.data.errors);
    }
    console.log("SUCCESS")
    console.log(response.data.data)
    setMenuItems(response.data.data);
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

  const onSubmit = async (values: UserCreateDto) => {
    const response = await axios.put<ApiResponse<UserGetDto>>(
      `${BaseUrl}/api/users/${user.id}`,
      values
    );

    if (response.data.hasErrors) {
      alert("Cannot be empty");

      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.home);
      alert("Item updated successfully");
    }
  };

  return (
    <>
    <div className="user-page-container">
    <Container >
      {menuItems && (
        <Formik initialValues={menuItems} onSubmit={onSubmit}>
          <Form>

            <Label htmlFor="firstName">First Name</Label>
            <Field id="firstName" name="firstName">
              {({ field }) => (
                <>
                  <Input {...field}></Input>
                </>
              )}
            </Field>
            <br />
            <br />
            <Label htmlFor="lastName">Last Name</Label>
            <Field id="lastName" name="lastName">
              {({ field }) => (
                <>
                  <Input {...field}></Input>
                </>
              )}
            </Field>
            <br />
            <br />
            <Label htmlFor="username">User Name</Label>
            <Field id="username" name="username">
              {({ field }) => (
                <>
                  <Input {...field}></Input>
                </>
              )}
            </Field>
            <br />
            <br />
            
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Field id="phoneNumber" name="phoneNumber">
              {({ field }) => (
                <>
                  <Input 
                  {...field}></Input>
                </>
              )}
            </Field>
            <br />
            <br />


            <Label htmlFor="zipCode">Zip Code</Label>
            <Field id="zipCode" name="zipCode">
              {({ field }) => (
                <>
                  <Input 
                  type="number"
                  {...field}></Input>
                </>
              )}
            </Field>
            <br />
            <br />
            <Label htmlFor="rewardPoints">Reward Points</Label>
            <Field disabled readOnlyid="rewardPoints" name="rewardPoints">
            
            </Field>
            <br />
            <br />
            <Label htmlFor="address">Address</Label>
            <br/>
            <Field id="address" name="address">
              {({ field }) => (
                <>
                  <TextArea
                    rows="1"
                    style={{ width: "300px", height: "30px" }}
                    {...field}
                  ></TextArea>{" "}
                </>
              )}
            </Field>
            <br /> <br />
            <Button className="ui positive basic button" type="submit">
              Update
            </Button>
          </Form>
        </Formik>
      )}
      </Container>
      </div>
    </>
  );
};
