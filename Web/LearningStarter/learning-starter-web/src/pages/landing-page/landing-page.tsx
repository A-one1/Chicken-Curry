import React from "react";
import { Header } from "semantic-ui-react";
import "./landing-page.css";
import "../../App";

import { BrowserRouter as Router, Switch, Routes, Route} from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';


//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page
export const LandingPage = () => {
  return (
    <><div className="home-page-container">
      <Header>Home Page 123</Header>
    </div><>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact />
          </Switch>
        </Router></></>
    
  );
};
// function LandingPage() {
//   return (
    // <>
    // <Router> 
    //   <Navbar />
    //   <Routes>
    //     <Route path='/' exact />
    //   </Routes>
    //   </Router></>

     
//     );
// }

//export default LandingPage;
