import produce from "immer";
import { createReducer } from "typesafe-actions";

import { cacheResponse } from "./cacheActions";
import CardsApiResponse from "../popup/payment-service-cards/CardsApiResponse";
import initialStripeApiResponse from "./initialStripeApiResponse";

const cacheReducer = createReducer({
  stripe: initialStripeApiResponse as CardsApiResponse
}).handleAction(cacheResponse, (state, action) =>
  produce(state, draft => {
    const { paymentService, apiResponse } = action.payload;
    draft[paymentService] = { ...apiResponse, lastFetched: new Date() };
  })
);

export default cacheReducer;
export type CacheState = ReturnType<typeof cacheReducer>;
