import * as React from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
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
interface State {
  loading: boolean;
}
export class PaymentServiceCards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: !Boolean(this.props.cardsApiResponse)
    };
  }

  componentDidMount() {
    if (!this.props.cardsApiResponse) {
      axios
        .get("http://localhost:8000/scrape-payment-service-test-cards")
        .then((response: AxiosResponse) => {
          this.props.addApiResponseToClientCache(response.data, "stripe");
          this.setState({
            loading: false
          });
        });
    }
  }

  render() {
    const { cardsApiResponse } = this.props;
    const { loading } = this.state;

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
  }
}

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
