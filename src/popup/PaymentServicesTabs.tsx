import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Star from "@material-ui/icons/Star";

const PaymentServicesTabs: React.StatelessComponent<
  RouteComponentProps<{}>
> = ({ match, history }) => (
  <Paper style={{ width: 500 }}>
    <Tabs
      variant="scrollable"
      value={match.url}
      onChange={(e, value) => {
        history.push(value);
      }}
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<Star />} value="/favourites" />
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
  </Paper>
);

export default withRouter(PaymentServicesTabs);
