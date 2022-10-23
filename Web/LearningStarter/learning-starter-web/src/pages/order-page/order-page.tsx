import React from "react";
import { useUser } from "../../authentication/use-auth";
import { Header, Container, Divider } from "semantic-ui-react";
import "./user-page.css";

export const OrderPage = () => {
  const user = useUser();
  return (
    <div className="user-page-container">
      <div>
        <Header>ORDER PAGE</Header>
        <Container textAlign="left">
          <Header size="small">First Name</Header>
          <p>{user.firstName}</p>
          <Divider />
          <Header size="small">Last Name</Header>
          <p>{user.lastName}</p>
        </Container>
      </div>
    </div>
  );
};
