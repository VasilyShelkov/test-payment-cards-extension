import { createAction } from "typesafe-actions";
import CardsApiResponse from "../popup/payment-service-cards/CardsApiResponse";

export const cacheResponse = createAction(
  "CACHE_RESPONSE",
  action => (apiResponse: CardsApiResponse, paymentService: "stripe") =>
    action({
      apiResponse,
      paymentService
    })
);
