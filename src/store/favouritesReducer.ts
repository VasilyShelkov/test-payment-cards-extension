import { createReducer } from "typesafe-actions";
import {
  addFavourite,
  removeFavourite,
  addRecentlyCopied
} from "./favouritesActions";
import { CardFavourite } from "../CardModel";

const favouritesReducer = createReducer({
  recentlyCopied: [] as CardFavourite[],
  cards: [] as CardFavourite[]
})
  .handleAction(addRecentlyCopied, (state, action) => {
    const recentlyCopiedCards = state.recentlyCopied;
    const cardNumbersInRecentlyCopied = recentlyCopiedCards.map(
      cardDetails => cardDetails.cardNum
    );
    const recentlyCopiedCardToAdd = action.payload.copiedCard;
    if (cardNumbersInRecentlyCopied.includes(recentlyCopiedCardToAdd.cardNum)) {
      return state;
    }

    const newRecentlyCopiedCards = [
      recentlyCopiedCardToAdd,
      ...recentlyCopiedCards
    ];
    return {
      ...state,
      recentlyCopied:
        recentlyCopiedCards.length >= 3
          ? newRecentlyCopiedCards.slice(0, 3)
          : newRecentlyCopiedCards
    };
  })
  .handleAction(addFavourite, (state, action) => {
    return {
      ...state,
      cards: [action.payload.newFavourite, ...state.cards]
    };
  })
  .handleAction(removeFavourite, (state, action) => {
    return {
      ...state,
      cards: state.cards.filter(
        favouriteCard => favouriteCard.cardNum !== action.payload.cardNumber
      )
    };
  });

export default favouritesReducer;
export type FavouritesState = ReturnType<typeof favouritesReducer>;
