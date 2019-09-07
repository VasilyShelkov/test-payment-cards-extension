import * as React from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { AnimatedSwitch, AnimatedRoute } from "react-router-transition";
import { Route, RouteComponentProps } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "typesafe-actions";

import * as cacheActions from "../../store/cacheActions";
import CardTypeChooser from "./CardTypeChooser";
import CardsList from "./CardsList";
import CardsApiResponse from "./CardsApiResponse";

interface Props extends RouteComponentProps<{}> {
  addApiResponseToClientCache: typeof cacheActions.cacheResponse;
  cardsApiResponse: CardsApiResponse;
}
interface State {
  loading: boolean;
}
interface AnimationProps {
  offset: number;
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
    const { match, cardsApiResponse } = this.props;
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
      <div style={{ position: "relative" }}>
        <AnimatedRoute
          exact={true}
          path={match.path}
          component={CardTypeChooser}
          atEnter={{ offset: -100 }}
          atLeave={{ offset: -100 }}
          atActive={{ offset: 0 }}
          mapStyles={(animationStyles: AnimationProps) => ({
            transform: `translateX(${animationStyles.offset}%)`,
            position: "absolute",
            top: "0",
            width: "100%"
          })}
        />
        <AnimatedSwitch
          atEnter={{ offset: 100 }}
          atLeave={{ offset: 100 }}
          atActive={{ offset: 0 }}
          mapStyles={(animationStyles: AnimationProps) => ({
            transform: `translateX(${animationStyles.offset}%)`
          })}
        >
          {cardsApiResponse.cardResponses && (
            <Route
              path={`${match.path}/responses`}
              render={props => (
                <CardsList
                  {...props}
                  listTitle="HTTP RESPONSES"
                  cards={cardsApiResponse && cardsApiResponse.cardResponses}
                />
              )}
            />
          )}

          {cardsApiResponse.cardTypes && (
            <Route
              path={`${match.path}/card-types`}
              render={props => (
                <CardsList
                  {...props}
                  listTitle="CARD TYPES"
                  cards={cardsApiResponse && cardsApiResponse.cardTypes}
                />
              )}
            />
          )}

          {cardsApiResponse.internationalCards && (
            <Route
              path={`${match.path}/international-cards`}
              render={props => (
                <CardsList
                  {...props}
                  listTitle="INTERNATIONAL CARDS"
                  cards={
                    cardsApiResponse && cardsApiResponse.internationalCards
                  }
                />
              )}
            />
          )}

          {cardsApiResponse && cardsApiResponse["3dsCards"] && (
            <Route
              path={`${match.url}/3ds-cards`}
              render={props => (
                <CardsList
                  {...props}
                  listTitle="3DS CARDS"
                  cards={cardsApiResponse && cardsApiResponse["3dsCards"]}
                />
              )}
            />
          )}
        </AnimatedSwitch>
      </div>
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
