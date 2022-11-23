import React from "react";
import { useUser } from "../../authentication/use-auth";
import { Header, Container, Divider } from "semantic-ui-react";
import "./user-page.css";

export const UserPage = () => {
  const user = useUser();
  console.log(user.firstName)
  console.log(user.Address)
  return (
    <div className="user-page-container">
      <div>
        <Header>User Information</Header>
        <Container textAlign="left">
          <Header size="small">First Name</Header>
          <p>{user.firstName}</p>
          <Divider />
          <Header size="small">Last Name</Header>
          <p>{user.lastName}</p>
          <Header size="small">Username</Header>
          <p>{user.userName}</p>
          <Header size="small">Phone Number</Header>
          <p>{user.PhoneNumber}</p>
          <Header size="small">Address</Header>
          <p>{user.Address}</p>
          <Header size="small">Zip Code</Header>
          <p>{user.ZipCode}</p>
          <Header size="small">Your Reward Points</Header>
          <p>{user.RewardPoints}</p>

        </Container>
      </div>
    </div>
  );
};
