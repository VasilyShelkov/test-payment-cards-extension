import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import { Card, CardFavourite } from "../../CardModel";
import CardToCopy from "./CardToCopy";
import {
  addFavourite,
  removeFavourite,
  addRecentlyCopied
} from "../../store/favouritesActions";
import { RootState } from "../../store/rootReducer";

import "./CardsList.css";

interface Props {
  cards?: Card[] | undefined;
  listTitle: string;
  addToFavourites: (newFavouriteCard: Card) => any;
  removeFromFavourites: (cardNumToRemove: string) => any;
  addCopiedCardToRecents: (copiedCard: Card) => any;
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
        variant="flat"
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
        />
      ))}
  </List>
);

const mapDispatchProps = (dispatch: Dispatch<{}>) => ({
  addToFavourites: (newFavouriteCard: Card) =>
    dispatch(addFavourite(newFavouriteCard, "stripe")),
  removeFromFavourites: (cardNum: string) =>
    dispatch(removeFavourite(cardNum, "stripe")),
  addCopiedCardToRecents: (copiedCard: Card) =>
    dispatch(addRecentlyCopied(copiedCard, "stripe"))
});
const mapStateToProps = (state: RootState) => ({
  favourites: state.favourites.cards
});
export default connect(
  mapStateToProps,
  mapDispatchProps
)(CardsList);
