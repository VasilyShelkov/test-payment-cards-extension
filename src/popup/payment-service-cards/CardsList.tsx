import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "typesafe-actions";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import { Card, CardFavourite } from "../../CardModel";
import CardToCopy from "./CardToCopy";
import * as favouritesActions from "../../store/favouritesActions";

import "./CardsList.css";

interface Props {
  cards?: Card[] | undefined;
  listTitle: string;
  addToFavourites: typeof favouritesActions.addFavourite;
  removeFromFavourites: typeof favouritesActions.removeFavourite;
  addCopiedCardToRecents: typeof favouritesActions.addRecentlyCopied;
  favourites: CardFavourite[];
}
export const CardsList: React.StatelessComponent<
  RouteComponentProps<{}> & Props
> = ({
  addToFavourites,
  removeFromFavourites,
  addCopiedCardToRecents,
  history,
  cards,
  listTitle,
  favourites
}) => (
  <List>
    <div className="CardsList__header">
      <Button
        onClick={() => history.goBack()}
        variant="text"
        size="small"
        color="secondary"
      >
        <ChevronLeft />
        Back
      </Button>
      <ListSubheader>{listTitle}</ListSubheader>
    </div>
    <Divider />
    {cards &&
      cards.map((cardDetails: Card, index) => (
        <CardToCopy
          key={`${index}-${cardDetails.cardNum}`}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          addCopiedCardToRecents={addCopiedCardToRecents}
          isFavourite={Boolean(
            favourites.find(({ cardNum }) => cardDetails.cardNum === cardNum)
          )}
          {...cardDetails}
          service="stripe"
        />
      ))}
  </List>
);

const dispatchProps = {
  addToFavourites: favouritesActions.addFavourite,
  removeFromFavourites: favouritesActions.removeFavourite,
  addCopiedCardToRecents: favouritesActions.addRecentlyCopied
};
const mapStateToProps = (state: RootState) => ({
  favourites: state.favourites.cards
});
export default connect(
  mapStateToProps,
  dispatchProps
)(CardsList);
