import "./page-wrapper.css";
import React from "react";
import { UserDto } from "../../constants/types";
import { PrimaryNavigation } from "../navigation/navigation";
import Navbar from "../navigation/Navbar";

type PageWrapperProps = {
  user?: UserDto;
};

//This is the wrapper that surrounds every page in the app.  Changes made here will be reflect all over.
export const PageWrapper: React.FC<PageWrapperProps> = ({ user, children }) => {
  return (
    <div className="content">
      {/* <PrimaryNavigation user={user} /> */}
      <Navbar />

      <div className="main-content" style={{overflowX:"hidden", padding:"10px"}}>{children}</div>
    </div>
  );
};
