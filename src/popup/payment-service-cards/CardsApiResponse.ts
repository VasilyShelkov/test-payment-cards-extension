import { Card } from "../../CardModel";

interface CardsApiResponse {
  cardTypes?: Card[];
  internationalCards?: Card[];
  "3dsCards"?: Card[];
  cardResponses?: Card[];
  lastFetched?: Date;
}

export default CardsApiResponse;
