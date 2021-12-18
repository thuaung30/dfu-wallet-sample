import { all, fork } from "redux-saga/effects";
import accountSaga from "../state/account/sagas";
import networksSaga from "../state/networks/sagas";
import networksUserDataSaga from "../state/networksUserData/sagas";
import eventSaga from "../state/events/sagas";

export default function* rootSaga() {
  yield all([
    fork(accountSaga),
    fork(networksSaga),
    fork(networksUserDataSaga),
    fork(eventSaga),
  ]);
}
