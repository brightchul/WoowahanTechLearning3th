import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "../types";
import { startMonitoring, stopMonitoring } from "../actions";
import { PlayButton } from "../components";

export interface MonitorControllerProps {
    monitoring: boolean;
    onStart(): void;
    onStop(): void;
}

function mapStateToProps(state: StoreState) {
    return { monitoring: state.monitoring };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        onStart: () => dispatch(startMonitoring(0)),
        onStop: () => dispatch(stopMonitoring(0)),
    };
}

function MonitorController({
    monitoring,
    onStart,
    onStop,
}: MonitorControllerProps) {
    return (
        <div>
            <PlayButton
                monitoring={monitoring}
                onPlay={onStart}
                onPause={onStop}
            ></PlayButton>
        </div>
    );
}

export const MonitorControllerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorController);
