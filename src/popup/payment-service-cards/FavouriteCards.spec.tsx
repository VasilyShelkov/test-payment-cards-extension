import * as React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";

import { CardFavourite } from "../../CardModel";
import { FavouriteCards } from "./FavouriteCards";
import CardToCopy from "./CardToCopy";

describe("app/FavouriteCards", () => {
  const setupTest = (favouriteCardsProps: any) => {
    const defaultProps = {
      recentlyCopiedCards: [],
      favouriteCards: [],
      addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
      addCopiedCardToRecents: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/favourites`]}>
        <FavouriteCards {...defaultProps} {...favouriteCardsProps} />
      </MemoryRouter>
    );

    return wrapper;
  };

  it("renders recently copied cards", () => {
    const recentlyCopiedCard: CardFavourite = {
      cardNum: "1111222233334444",
      description: "recently copied cards unit test",
      paymentService: "stripe"
    };
    const wrapper = setupTest({
      recentlyCopiedCards: [recentlyCopiedCard]
    });

    expect(wrapper.find(CardToCopy).length).toEqual(1);
    expect(
      wrapper
        .find(CardToCopy)
        .first()
        .props()
    ).toEqual(expect.objectContaining(recentlyCopiedCard));
    expect(
      wrapper
        .find(ListSubheader)
        .first()
        .text()
    ).toEqual("1 Recently Copied cards");
  });

  it("renders message when no recently copied cards", () => {
    const wrapper = setupTest({
      recentlyCopiedCards: []
    });

    expect(wrapper.find(CardToCopy).length).toEqual(0);
    expect(
      wrapper
        .find(ListSubheader)
        .first()
        .text()
    ).toEqual("0 Recently Copied cards");
  });

  it("renders favourite cards", () => {
    const favouriteCard: CardFavourite = {
      cardNum: "1111222233334444",
      description: "favourite cards unit test",
      paymentService: "stripe"
    };
    const wrapper = setupTest({
      favouriteCards: [favouriteCard]
    });

    expect(wrapper.find(CardToCopy).length).toEqual(1);
    expect(
      wrapper
        .find(CardToCopy)
        .first()
        .props()
    ).toEqual(expect.objectContaining(favouriteCard));
    expect(
      wrapper
        .find(ListSubheader)
        .at(1)
        .text()
    ).toEqual("1 Favourites");
  });

  it("renders message when no favourite cards", () => {
    const wrapper = setupTest({
      favouriteCards: []
    });

    expect(wrapper.find(CardToCopy).length).toEqual(0);
    expect(
      wrapper
        .find(ListSubheader)
        .at(1)
        .text()
    ).toEqual("0 Favourites");
  });
});
