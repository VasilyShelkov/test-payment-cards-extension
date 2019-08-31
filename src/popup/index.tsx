import * as React from "react";
import { MemoryRouter as Router, Route } from "react-router-dom";

import PaymentServiesTabs from "./PaymentServicesTabs";
import PaymentServiceCards from "./payment-service-cards";
import FavouriteCards from "./payment-service-cards/FavouriteCards";
import "./index.css";

export default () => (
  <div className="App">
    <Router initialEntries={["/favourites"]}>
      <>
        <Route path="/(favourites|stripe)" component={PaymentServiesTabs} />
        <Route path="/favourites" component={FavouriteCards} />
        <Route path="/stripe" component={PaymentServiceCards} />
      </>
    </Router>
  </div>
);
