import { StateType, ActionType } from "typesafe-actions";

declare module "typesafe-actions" {
  export type Store = StateType<typeof import("./store/index").default>;

  export type RootState = StateType<
    typeof import("./store/rootReducer").default
  >;

  export type RootAction = ActionType<
    typeof import("./store/rootAction").default
  >;

  interface Types {
    RootAction: RootAction;
  }
}
