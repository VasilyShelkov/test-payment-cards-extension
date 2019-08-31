import { getType } from "typesafe-actions";
import { cacheResponse } from "./cacheActions";
import CardsApiResponse from "../popup/payment-service-cards/CardsApiResponse";
import initialStripeApiResponse from "./initialStripeApiResponse";

export interface State {
  stripe?: CardsApiResponse;
}
export const initialState: State = {
  stripe: initialStripeApiResponse
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case getType(cacheResponse):
      return {
        ...state,
        [action.payload.paymentService]: {
          ...action.payload.apiResponse,
          lastFetched: new Date()
        }
      };
    default:
      return state;
  }
};
