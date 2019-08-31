import { createAction } from "typesafe-actions";
import { Card } from "../CardModel";

const ADD_FAVOURITE = "ADD_FAVOURITE";
export const addFavourite = createAction(
  ADD_FAVOURITE,
  (newFavourite: Card, paymentService: "stripe") => ({
    type: ADD_FAVOURITE,
    payload: {
      newFavourite: {
        ...newFavourite,
        paymentService
      }
    }
  })
);

export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const removeFavourite = createAction(
  REMOVE_FAVOURITE,
  (cardNumber: string, paymentService: "stripe") => ({
    type: REMOVE_FAVOURITE,
    payload: { cardNumber, paymentService }
  })
);

const ADD_RECENTLY_COPIED = "ADD_RECENTLY_COPIED";
export const addRecentlyCopied = createAction(
  ADD_RECENTLY_COPIED,
  (copiedCard: Card, paymentService: "stripe") => ({
    type: ADD_RECENTLY_COPIED,
    payload: {
      copiedCard: {
        ...copiedCard,
        paymentService
      }
    }
  })
);
