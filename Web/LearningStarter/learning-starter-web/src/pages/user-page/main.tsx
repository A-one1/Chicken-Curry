// import React from "react";
// import { useUser } from "../../authentication/use-auth";
// import { Header, Container, Divider, Button } from "semantic-ui-react";
// import "./user-page.css";
// import { useEffect, useState } from "react";
// import { Formik } from "formik";
// import {
//   ApiResponse,
//   UserCreateDto,
//   UserDto,
//   UserGetDto,
// } from "../../constants/types";
// import axios from "axios";
// import { BaseUrl } from "../../constants/env-vars";

// export const UserPage = () => {
//   const user = useUser();

//   return (
//     <div className="user-page-container">
//       <div>
//         <Header>User Information</Header>
//         <Container textAlign="left">
//           <Header size="small">First Name</Header>
//           <p>{user.firstName}</p>
//           <Divider />
//           <Header size="small">Last Name</Header>
//           <p>{user.lastName}</p>
//           <Header size="small">Username</Header>
//           <p>{user.username}</p>
//           <Header size="small">Phone Number</Header>
//           <p>{user.phoneNumber}</p>
//           <Header size="small">Address</Header>
//           <p>{user.address}</p>
//           <Header size="small">Zip Code</Header>
//           <p>{user.zipCode}</p>
//           <Header size="small">Your Reward Points</Header>
//           <p>{user.rewardPoints}</p>
//         </Container>
//       </div>
//     </div>
//   );
// };
