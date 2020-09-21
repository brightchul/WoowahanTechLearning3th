import { ActionType, getType } from "typesafe-actions";
import { StoreState } from "../types";
import * as Actions from "../actions";

const initializeState: StoreState = {
    monitoring: false,
    success: 0,
    failure: 0,
};

const randomNumber = (num1: number, num2: number): number =>
    Math.floor(Math.random() * num1 + num2);

export default (
    state: StoreState = initializeState,
    action: ActionType<typeof Actions>
) => {
    switch (action.type) {
        case getType(Actions.fetchSuccess):
            return {
                ...state,
                success: state.success + randomNumber(99, 1),
            };
        case getType(Actions.fetchFailure):
            return {
                ...state,
                failure: state.failure + randomNumber(2, 0),
            };

        default:
            console.log(action.type);
            return { ...state };
    }
};
