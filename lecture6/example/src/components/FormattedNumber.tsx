import * as React from "react";

const DEFAULT_SAPARATOR = ".";

interface FormattedNumberProps {
    value: number;
    separator?: string;
}

export function FormattedNumber({
    separator = DEFAULT_SAPARATOR,
    value,
}: FormattedNumberProps) {
    const formattedNumber = String(value).replace(
        /(\d)(?=(?:\d{3})+(?!\d))/g,
        `$1${separator}`
    );
    return <span>{formattedNumber}</span>;
}
