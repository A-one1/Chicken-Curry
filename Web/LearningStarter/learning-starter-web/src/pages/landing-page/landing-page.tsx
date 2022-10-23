import React from "react";
import { Header } from "semantic-ui-react";
import "./landing-page.css";
import "../../App";
import { BrowserRouter as Router, Switch, Routes, Route} from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';
import Home from "../home/home";
import HeroSection from "../../components/videoplayback/HeroSection";


//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page
export const LandingPage = () => {
  return (

    <>
        <Router>
          <Navbar />
          
            <HeroSection/>
          
        </Router></>
    
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
