import React from "react";
import {
    OrderStatusContainer,
    MonitorControllerContainer,
} from "./containers";

import { Typography } from "antd";

import "antd/dist/antd.css";

import "./sass/main.scss";

export default function App() {
    return (
        <div>
            <header>
                <Typography.Title>
                    React & TS Boilerplate
                </Typography.Title>
            </header>

            <main>
                <OrderStatusContainer />
                <MonitorControllerContainer />
            </main>
        </div>
    );
}
