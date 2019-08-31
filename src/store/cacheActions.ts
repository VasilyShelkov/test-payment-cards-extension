import { createAction } from "typesafe-actions";
import CardsApiResponse from "../popup/payment-service-cards/CardsApiResponse";

const CACHE_RESPONSE = "CACHE_RESPONSE";
export const cacheResponse = createAction(
  CACHE_RESPONSE,
  (apiResponse: CardsApiResponse, paymentService: "stripe") => ({
    type: CACHE_RESPONSE,
    payload: {
      apiResponse,
      paymentService
    }
  })
);
