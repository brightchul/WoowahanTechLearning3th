import React, { useState } from "react";
import { Button } from "antd";

interface PlayButtonProps {
    monitoring: boolean;
    onPlay?: () => void;
    onPause?: () => void;
}

export function PlayButton(props: PlayButtonProps) {
    const [isPlay, togglePlay] = useState(props.monitoring);
    const renderIcon = isPlay ? "pause" : "caret-right";

    return (
        <Button
            style={{ marginTop: 20 }}
            shape="circle"
            icon={renderIcon}
            onClick={() => {
                if (isPlay) {
                    props.onPause && props.onPause();
                } else {
                    props.onPlay && props.onPlay();
                }

                togglePlay(!isPlay);
            }}
        ></Button>
    );
}
