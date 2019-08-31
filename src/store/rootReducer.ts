import { combineReducers } from "redux";
import favourites, { State as FavouritesState } from "./favouritesReducer";
import cache, { State as CacheState } from "./cacheReducer";

export interface RootState {
  favourites: FavouritesState;
  cache: CacheState;
}
export default combineReducers({
  favourites,
  cache
});
