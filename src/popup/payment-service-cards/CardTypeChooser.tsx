import * as React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRight from "@material-ui/icons/ChevronRight";
import HTTP from "@material-ui/icons/Http";
import Card from "@material-ui/icons/CreditCard";
import Flag from "@material-ui/icons/Flag";
import Security from "@material-ui/icons/Security";

const PaymentServicesTabs: React.StatelessComponent<
  RouteComponentProps
> = () => (
  <List component="nav">
    <ListItem
      component={props => <Link {...props} to="responses" />}
      button={true}
    >
      <ListItemIcon>
        <HTTP />
      </ListItemIcon>
      <ListItemText primary="Responses" />
      <ChevronRight />
    </ListItem>

    <ListItem
      component={props => <Link {...props} to="card-types" />}
      button={true}
    >
      <ListItemIcon>
        <Card />
      </ListItemIcon>
      <ListItemText primary="Types" />
      <ChevronRight />
    </ListItem>

    <ListItem
      component={props => <Link {...props} to="international-cards" />}
      button={true}
    >
      <ListItemIcon>
        <Flag />
      </ListItemIcon>
      <ListItemText primary="International" />
      <ChevronRight />
    </ListItem>

    <ListItem
      component={props => <Link {...props} to="3ds-cards" />}
      button={true}
    >
      <ListItemIcon>
        <Security />
      </ListItemIcon>
      <ListItemText primary="3DS" />
      <ChevronRight />
    </ListItem>
  </List>
);

export default PaymentServicesTabs;
