import {
    fork,
    all,
    take,
    race,
    delay,
    put,
} from "redux-saga/effects";
import { getType } from "typesafe-actions";
import * as Actions from "../actions";

function* monitoringWorkflow() {
    while (true) {
        yield take(getType(Actions.startMonitoring));

        let isLoop = true;
        while (isLoop) {
            yield all([
                put({ type: getType(Actions.fetchSuccess) }),
                put({ type: getType(Actions.fetchFailure) }),
            ]);

            const { isStop } = yield race({
                waitting: delay(200),
                isStop: take(getType(Actions.stopMonitoring)),
            });

            if (isStop) {
                isLoop = false;
            }
        }
    }
}

export default function* () {
    yield fork(monitoringWorkflow);
}
