import favouritesReducer, { initialState, State } from "./favouritesReducer";
import {
  addRecentlyCopied,
  addFavourite,
  removeFavourite
} from "./favouritesActions";
import { Card, PaymentServiceProvider } from "../CardModel";

describe("store/favouritesReducer", () => {
  it("should return state when unknown action", () => {
    const action = {};
    expect(favouritesReducer(initialState, action)).toEqual(initialState);
  });

  it("add new recently copied card", () => {
    const cardToCopy: Card = {
      cardNum: "1111 2222 3333 4444",
      description: "unit test card"
    };
    const action = addRecentlyCopied(cardToCopy, "stripe");
    expect(favouritesReducer(initialState, action)).toEqual({
      ...initialState,
      recentlyCopied: [
        {
          ...cardToCopy,
          paymentService: "stripe"
        }
      ]
    });
  });

  it("do not add a duplicate recently copied card", () => {
    const cardToCopy: Card = {
      cardNum: "1111 2222 3333 4444",
      description: "unit test card"
    };
    const action = addRecentlyCopied(cardToCopy, "stripe");
    const beforeState: State = {
      ...initialState,
      recentlyCopied: [
        {
          ...cardToCopy,
          paymentService: "stripe"
        }
      ]
    };
    expect(favouritesReducer(beforeState, action)).toEqual(beforeState);
  });

  it("if adding a 4th recently copied card, only return the 3 most recent cards", () => {
    const cardToCopy: Card = {
      cardNum: "444444444444",
      description: "fourth unit test card"
    };
    const action = addRecentlyCopied(cardToCopy, "stripe");
    const threeMostRecentlyCopiedCards = [
      {
        cardNum: "1111111111111111",
        description: "first unit test card",
        paymentService: "stripe" as PaymentServiceProvider
      },
      {
        cardNum: "2222222222222222",
        description: "second unit test card",
        paymentService: "stripe" as PaymentServiceProvider
      },
      {
        cardNum: "3333333333333333",
        description: "third unit test card",
        paymentService: "stripe" as PaymentServiceProvider
      }
    ];
    const beforeState: State = {
      ...initialState,
      recentlyCopied: threeMostRecentlyCopiedCards
    };
    expect(favouritesReducer(beforeState, action)).toEqual({
      ...beforeState,
      recentlyCopied: [
        {
          ...cardToCopy,
          paymentService: "stripe"
        },
        {
          cardNum: "1111111111111111",
          description: "first unit test card",
          paymentService: "stripe" as PaymentServiceProvider
        },
        {
          cardNum: "2222222222222222",
          description: "second unit test card",
          paymentService: "stripe" as PaymentServiceProvider
        }
      ]
    });
  });

  it("add new favourite", () => {
    const newFavouriteCard: Card = {
      cardNum: "1111 2222 3333 4444",
      description: "unit test card"
    };
    const action = addFavourite(newFavouriteCard, "stripe");
    expect(favouritesReducer(initialState, action)).toEqual({
      ...initialState,
      cards: [
        {
          ...newFavouriteCard,
          paymentService: "stripe"
        }
      ]
    });
  });

  it("remove favourite card", () => {
    const favouriteCardNumToRemove = "1111 2222 3333 4444";
    const action = removeFavourite(favouriteCardNumToRemove, "stripe");
    const beforeState = {
      ...initialState,
      cards: [
        {
          cardNum: "1111 2222 3333 4444",
          description: "unit test card",
          paymentService: "stripe" as PaymentServiceProvider
        }
      ]
    };
    expect(favouritesReducer(beforeState, action)).toEqual(initialState);
  });
});
