import * as React from "react";
import { createStore } from "redux";
import { MemoryRouter, Route } from "react-router-dom";
import { mount } from "enzyme";

import rootReducer from "../../store/rootReducer";
import { PaymentServiceCards } from "./index";
import CardsApiResponse from "./CardsApiResponse";
import { CardsList } from "./CardsList";
import { Provider } from "react-redux";

describe("app/payment-service-cards", () => {
  const setupTest = (apiResponse: CardsApiResponse, initialRoute: string) => {
    const addcardsApiResponse = jest.fn();
    const store = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/stripe${initialRoute}`]}>
          <Route
            path="/stripe"
            render={props => (
              <PaymentServiceCards
                {...props}
                addApiResponseToClientCache={addcardsApiResponse}
                cardsApiResponse={apiResponse}
              />
            )}
          />
        </MemoryRouter>
      </Provider>
    );

    return wrapper;
  };

  it("renders http response cards", () => {
    const apiResponse: CardsApiResponse = {
      cardResponses: [
        {
          cardNum: "1111222233334444",
          description: "payment service cards unit test"
        }
      ]
    };
    const wrapper = setupTest(apiResponse, "/responses");

    expect(wrapper.find(CardsList).length).toEqual(1);
    expect(wrapper.find(CardsList).props().cards).toEqual(
      apiResponse.cardResponses
    );
  });

  it("renders card types", () => {
    const apiResponse: CardsApiResponse = {
      cardTypes: [
        {
          cardNum: "1111222233334444",
          description: "payment service cards unit test"
        }
      ]
    };
    const wrapper = setupTest(apiResponse, "/card-types");

    expect(wrapper.find(CardsList).length).toEqual(1);
    expect(wrapper.find(CardsList).props().cards).toEqual(
      apiResponse.cardTypes
    );
  });

  it("renders international cards", () => {
    const apiResponse: CardsApiResponse = {
      internationalCards: [
        {
          cardNum: "1111222233334444",
          description: "payment service cards unit test"
        }
      ]
    };
    const wrapper = setupTest(apiResponse, "/international-cards");

    expect(wrapper.find(CardsList).length).toEqual(1);
    expect(wrapper.find(CardsList).props().cards).toEqual(
      apiResponse.internationalCards
    );
  });

  it("renders 3ds cards", () => {
    const apiResponse: CardsApiResponse = {
      "3dsCards": [
        {
          cardNum: "1111222233334444",
          description: "payment service cards unit test"
        }
      ]
    };
    const wrapper = setupTest(apiResponse, "/3ds-cards");

    expect(wrapper.find(CardsList).length).toEqual(1);
    expect(wrapper.find(CardsList).props().cards).toEqual(
      apiResponse["3dsCards"]
    );
  });
});
