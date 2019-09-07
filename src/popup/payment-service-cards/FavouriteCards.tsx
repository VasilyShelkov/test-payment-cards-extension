import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { RootState } from "typesafe-actions";

import * as favouritesActions from "../../store/favouritesActions";
import { CardFavourite } from "../../CardModel";
import CardToCopy from "./CardToCopy";
import "./FavouriteCards.css";

interface Props extends RouteComponentProps<{}> {
  recentlyCopiedCards: CardFavourite[];
  favouriteCards: CardFavourite[];
  addToFavourites: typeof favouritesActions.addFavourite;
  removeFromFavourites: typeof favouritesActions.removeFavourite;
  addCopiedCardToRecents: typeof favouritesActions.addRecentlyCopied;
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
          service="stripe"
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
          service="stripe"
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
const dispatchProps = {
  addToFavourites: favouritesActions.addFavourite,
  removeFromFavourites: favouritesActions.removeFavourite,
  addCopiedCardToRecents: favouritesActions.addRecentlyCopied
};
export default connect(
  mapStateToProps,
  dispatchProps
)(FavouriteCards);
