import { createAction } from "typesafe-actions";

const MONITORING_START = "@command/monitoring/start";
const MONITORING_STOP = "@command/monitoring/stop";
const FETCH_SUCCESS = "@fetch/success";
const FETCH_FAILURE = "@fetch/failure";

export const startMonitoring = createAction(
    MONITORING_START,
    (resolve) => () => resolve()
)<() => void>();

export const stopMonitoring = createAction(
    MONITORING_STOP,
    (resolve) => () => resolve()
)<() => void>();

export const fetchSuccess = createAction(
    FETCH_SUCCESS,
    (resolve) => () => resolve()
)<() => void>();

export const fetchFailure = createAction(
    FETCH_FAILURE,
    (resolve) => () => resolve()
)<() => void>();
