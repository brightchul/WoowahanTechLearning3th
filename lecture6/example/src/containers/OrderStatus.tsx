import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../types";
import { Counter, MonitorCard } from "../components";

export interface OrderStatusProps {
    success: number;
    failure: number;
}

const mapStateToProps = ({ success, failure }: StoreState) => ({
    success,
    failure,
});

const getErrorRate = (success: number, failure: number): number => {
    if (failure > 0) {
        return parseFloat(
            (Number(failure / success) * 100).toFixed(2)
        );
    } else {
        return 0;
    }
};
// failure > 0 ? (Number(failure / success) * 100).toFixed(2) : 0;

function OrderStatus({ success, failure }: OrderStatusProps) {
    return (
        <MonitorCard>
            <Counter title="Success" count={success} />
            <Counter title="Failure" count={failure} color="red" />
            <Counter
                title="Error Rate"
                count={getErrorRate(success, failure)}
                unit="%"
            />
        </MonitorCard>
    );
}

export const OrderStatusContainer = connect(mapStateToProps)(
    OrderStatus
);
