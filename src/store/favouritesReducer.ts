import { getType } from "typesafe-actions";
import {
  addFavourite,
  removeFavourite,
  addRecentlyCopied
} from "./favouritesActions";
import { CardFavourite } from "../CardModel";

export interface State {
  recentlyCopied: CardFavourite[];
  cards: CardFavourite[];
}
export const initialState: State = {
  recentlyCopied: [],
  cards: []
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case getType(addRecentlyCopied):
      const recentlyCopiedCards = state.recentlyCopied;
      const cardNumbersInRecentlyCopied = recentlyCopiedCards.map(
        cardDetails => cardDetails.cardNum
      );
      const recentlyCopiedCardToAdd = action.payload.copiedCard;
      if (
        cardNumbersInRecentlyCopied.includes(recentlyCopiedCardToAdd.cardNum)
      ) {
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
    case getType(addFavourite):
      return {
        ...state,
        cards: [action.payload.newFavourite, ...state.cards]
      };
    case getType(removeFavourite):
      return {
        ...state,
        cards: state.cards.filter(
          favouriteCard => favouriteCard.cardNum !== action.payload.cardNumber
        )
      };
    default:
      return state;
  }
};
