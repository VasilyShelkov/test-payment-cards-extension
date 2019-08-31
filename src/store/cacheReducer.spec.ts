import cacheReducer, { initialState } from "./cacheReducer";
import { cacheResponse } from "./cacheActions";
import CardsApiResponse from "../app/payment-service-cards/CardsApiResponse";

describe("store/cacheReducer", () => {
  it("should return state when unknown action", () => {
    const action = {};
    expect(cacheReducer(initialState, action)).toEqual(initialState);
  });

  it("should cache the new payment service api response", () => {
    const apiResponse: CardsApiResponse = {
      cardTypes: [
        {
          cardNum: "1111222233334444",
          description: "cache reducer unit test card"
        }
      ]
    };
    const action = cacheResponse(
      {
        cardTypes: [
          {
            cardNum: "1111222233334444",
            description: "cache reducer unit test card"
          }
        ]
      },
      "stripe"
    );
    expect(cacheReducer(initialState, action)).toEqual({
      stripe: {
        ...apiResponse,
        lastFetched: expect.any(Date)
      }
    });
  });
});
