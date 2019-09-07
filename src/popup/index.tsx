import * as React from "react";
import { Router, Redirect } from "@reach/router";

import PaymentServiesTabs from "./PaymentServicesTabs";
import PaymentServiceCards from "./payment-service-cards";
import FavouriteCards from "./payment-service-cards/FavouriteCards";
import "./index.css";

export default () => (
  <div className="App">
    <PaymentServiesTabs />
    <Router>
      <Redirect from="/popup.html" to="/" />
      <FavouriteCards path="/" />
      <PaymentServiceCards path="/stripe/*" />
    </Router>
  </div>
);
