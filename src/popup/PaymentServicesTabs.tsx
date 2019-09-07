import * as React from "react";
import { Location } from "@reach/router";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Star from "@material-ui/icons/Star";

type possibleRoutes = "/stripe" | "/favourites";
const PaymentServicesTabs: React.StatelessComponent = () => (
  <Paper style={{ width: 500 }}>
    <Location>
      {({ navigate, location }) => (
        <Tabs
          variant="scrollable"
          value={`/${location.pathname.split("/")[1]}`}
          onChange={(e, value: possibleRoutes) => {
            navigate(value);
          }}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Star />} value="/" />
          <Tab
            icon={
              <img
                src="payment-service-logos/stripe-logo.svg"
                height="45"
                alt="stripe"
              />
            }
            value="/stripe"
          />
        </Tabs>
      )}
    </Location>
  </Paper>
);

export default PaymentServicesTabs;
