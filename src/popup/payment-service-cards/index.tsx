import * as React from "react";
import useAxios from "@use-hooks/axios";
import { useSelector, useDispatch } from "react-redux";
import { Router, RouteComponentProps } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as cacheActions from "../../store/cacheActions";
import CardTypeChooser from "./CardTypeChooser";
import CardsList from "./CardsList";
import { RootState } from "typesafe-actions";

const PaymentServiceCards: React.FC<RouteComponentProps> = () => {
  const cardsApiResponse = useSelector(
    (state: RootState) => state.cache.stripe
  );
  const dispatch = useDispatch();
  const { loading } = useAxios({
    url: `http://localhost:8000/scrape-payment-service-test-cards`,
    method: "GET",
    filter: () => !cardsApiResponse,
    customHandler: (error, response) =>
      response && dispatch(cacheActions.cacheResponse(response.data, "stripe"))
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px"
        }}
      >
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <>
      <Router>
        <CardTypeChooser path="/" />
        {cardsApiResponse.cardResponses && (
          <CardsList
            path="/responses"
            listTitle="HTTP RESPONSES"
            cards={cardsApiResponse && cardsApiResponse.cardResponses}
          />
        )}

        {cardsApiResponse.cardTypes && (
          <CardsList
            path="/card-types"
            listTitle="CARD TYPES"
            cards={cardsApiResponse && cardsApiResponse.cardTypes}
          />
        )}

        {cardsApiResponse.internationalCards && (
          <CardsList
            path="/international-cards"
            listTitle="INTERNATIONAL CARDS"
            cards={cardsApiResponse && cardsApiResponse.internationalCards}
          />
        )}

        {cardsApiResponse && cardsApiResponse["3dsCards"] && (
          <CardsList
            path="/3ds-cards"
            listTitle="3DS CARDS"
            cards={cardsApiResponse && cardsApiResponse["3dsCards"]}
          />
        )}
      </Router>
    </>
  );
};

export default PaymentServiceCards;
