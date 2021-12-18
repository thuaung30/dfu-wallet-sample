import { combineReducers } from "redux";
import { reducer as accountReducer } from "../state/account/reducer";
import { reducer as networksReducer } from "../state/networks/reducer";
import { reducer as networksUserDataReducer } from "../state/networksUserData/reducer";
import { reducer as eventsReducer } from "../state/events/reducer";

const rootReducer = combineReducers({
  account: accountReducer,
  networks: networksReducer,
  networksUserData: networksUserDataReducer,
  events: eventsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
