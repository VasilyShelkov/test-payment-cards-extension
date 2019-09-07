import { createAction } from "typesafe-actions";
import { Card } from "../CardModel";

const ADD_FAVOURITE = "ADD_FAVOURITE";
export const addFavourite = createAction(
  ADD_FAVOURITE,
  action => (newFavourite: Card, paymentService: "stripe") =>
    action({
      newFavourite: {
        ...newFavourite,
        paymentService
      }
    })
);

export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
export const removeFavourite = createAction(
  REMOVE_FAVOURITE,
  action => (cardNumber: string, paymentService: "stripe") =>
    action({
      cardNumber,
      paymentService
    })
);

const ADD_RECENTLY_COPIED = "ADD_RECENTLY_COPIED";
export const addRecentlyCopied = createAction(
  ADD_RECENTLY_COPIED,
  action => (copiedCard: Card, paymentService: "stripe") =>
    action({
      copiedCard: {
        ...copiedCard,
        paymentService
      }
    })
);
