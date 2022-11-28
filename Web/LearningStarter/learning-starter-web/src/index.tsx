import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {QueryClient,QueryClientProvider } from 'react-query';
import "semantic-ui-css/semantic.min.css";

const client=new QueryClient();
//This is the base level of your app.
//This is where you would put global things (like Router)
ReactDOM.render(
  <QueryClientProvider client={client}>
  <Router>
    <App />
  </Router>
  </QueryClientProvider>,

  document.getElementById("root")
);
