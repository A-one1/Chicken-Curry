import React from "react";
import "./App.css";
import "./styles/global.css";
import { Routes } from "./routes/config";
import { GlobalStyles } from "./styles/index";
import { AuthProvider } from "./authentication/use-auth";
import { ShoppingCartProvider } from "./context/ShoppinCartContext";

//This is almost the base level of your app.  You can also put global things here.
function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
