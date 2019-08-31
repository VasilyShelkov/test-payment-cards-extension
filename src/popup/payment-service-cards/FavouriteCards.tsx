import * as React from "react";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import {
  addFavourite,
  removeFavourite,
  addRecentlyCopied
} from "../../store/favouritesActions";
import { RootState } from "../../store/rootReducer";
import { Card, CardFavourite } from "../../CardModel";
import CardToCopy from "./CardToCopy";
import "./FavouriteCards.css";

interface Props extends RouteComponentProps<{}> {
  recentlyCopiedCards: CardFavourite[];
  favouriteCards: CardFavourite[];
  addToFavourites: (newFavouriteCard: Card) => any;
  removeFromFavourites: (cardNumToRemove: string) => any;
  addCopiedCardToRecents: (copiedCard: Card) => any;
}
export const FavouriteCards: React.StatelessComponent<Props> = ({
  recentlyCopiedCards,
  favouriteCards,
  addToFavourites,
  removeFromFavourites,
  addCopiedCardToRecents,
  ...props
}) => (
  <List className="Favourites">
    <ListSubheader className="Favourites__list_subheader">
      {recentlyCopiedCards.length} Recently Copied cards
    </ListSubheader>
    {recentlyCopiedCards.length ? (
      recentlyCopiedCards.map((cardDetails: CardFavourite, index) => (
        <CardToCopy
          key={`${index}-${cardDetails.cardNum}`}
          isFavourite={Boolean(
            favouriteCards.find(
              ({ cardNum }) => cardDetails.cardNum === cardNum
            )
          )}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          {...cardDetails}
        />
      ))
    ) : (
      <Typography variant="body2" className="Favourites__none">
        You haven't copied any cards recently
      </Typography>
    )}

    <ListSubheader className="Favourites__list_subheader">
      {favouriteCards.length} Favourites
    </ListSubheader>
    {favouriteCards.length ? (
      favouriteCards.map((cardDetails: CardFavourite, index) => (
        <CardToCopy
          key={`${index}-${cardDetails.cardNum}`}
          isFavourite={true}
          favouritedIcon="delete"
          removeFromFavourites={removeFromFavourites}
          addCopiedCardToRecents={addCopiedCardToRecents}
          {...cardDetails}
        />
      ))
    ) : (
      <Typography variant="body2" className="Favourites__none">
        You have no favourites yet
      </Typography>
    )}
  </List>
);

const mapStateToProps = (state: RootState) => ({
  favouriteCards: state.favourites.cards,
  recentlyCopiedCards: state.favourites.recentlyCopied
});
const mapDispatchProps = (dispatch: Dispatch<{}>) => ({
  addToFavourites: (newFavouriteCard: Card) =>
    dispatch(addFavourite(newFavouriteCard, "stripe")),
  removeFromFavourites: (cardNum: string) =>
    dispatch(removeFavourite(cardNum, "stripe")),
  addCopiedCardToRecents: (copiedCard: Card) =>
    dispatch(addRecentlyCopied(copiedCard, "stripe"))
});
export default connect(
  mapStateToProps,
  mapDispatchProps
)(FavouriteCards);
