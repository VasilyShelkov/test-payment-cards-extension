import { combineReducers } from "redux";
import favourites from "./favouritesReducer";
import cache from "./cacheReducer";

export default combineReducers({
  favourites,
  cache
});
