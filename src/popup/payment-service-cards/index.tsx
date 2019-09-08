import * as React from "react";
import useAxios from "@use-hooks/axios";
import { connect } from "react-redux";
import { RouteComponentProps, Router } from "@reach/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "typesafe-actions";

import * as cacheActions from "../../store/cacheActions";
import CardTypeChooser from "./CardTypeChooser";
import CardsList from "./CardsList";
import CardsApiResponse from "./CardsApiResponse";

interface Props extends RouteComponentProps {
  addApiResponseToClientCache: typeof cacheActions.cacheResponse;
  cardsApiResponse: CardsApiResponse;
}
const PaymentServiceCards = ({
  cardsApiResponse,
  addApiResponseToClientCache
}: Props) => {
  const { loading } = useAxios({
    url: `http://localhost:8000/scrape-payment-service-test-cards`,
    method: "GET",
    filter: () => !cardsApiResponse,
    customHandler: (error, response) =>
      response && addApiResponseToClientCache(response.data, "stripe")
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

const dispatchProps = {
  addApiResponseToClientCache: cacheActions.cacheResponse
};
const mapStateToProps = (state: RootState) => ({
  cardsApiResponse: state.cache.stripe
});
export default connect(
  mapStateToProps,
  dispatchProps
)(PaymentServiceCards);
