import * as React from "react";
import { FormattedNumber } from "./FormattedNumber";

const DEFAULT_UNIT = "";
const DEFAULT_COLOR = "#000";

interface CounterProps {
    title: string;
    count: number;
    color?: string;
    unit?: string;
}

export function Counter({
    title,
    count,
    color = DEFAULT_COLOR,
    unit = DEFAULT_UNIT,
}: CounterProps) {
    return (
        <div className="item">
            <p>{title}</p>
            <p style={{ color }}>
                <FormattedNumber value={count} />
                <span className="unit">{unit}</span>
            </p>
        </div>
    );
}
