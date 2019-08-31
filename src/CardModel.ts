export interface Card {
  cardNum: string;
  description: string;
}

export type PaymentServiceProvider = "stripe";
export interface CardFavourite extends Card {
  paymentService: PaymentServiceProvider;
}
