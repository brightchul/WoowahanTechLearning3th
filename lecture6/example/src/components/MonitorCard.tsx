import * as React from "react";
import { Card } from "antd";

export function MonitorCard({
    children,
}: {
    children: React.ReactElement | Array<React.ReactElement>;
}) {
    return (
        <Card
            bordered={false}
            bodyStyle={{
                background: "#fff",
                padding: "24px",
            }}
        >
            <div className="wrapper">{children}</div>
        </Card>
    );
}
