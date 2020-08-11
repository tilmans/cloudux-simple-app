import React, {useState} from 'react'
import {DragTarget} from "./DragTarget";
import {DropTarget} from "./DropTarget";
import {PlayerControl} from "./PlayerControl";

export function SampleContainer({avid}) {
    return (
        <div style={samples}>
            <DragTarget avid={avid}/>
            <DropTarget avid={avid}/>
            <PlayerControl avid={avid}/>
        </div>
    )
}

const samples = {
    display: "flex",
    flexDirection: "column",
    spacing: "10px",
    height: "100%",
    width: "100%",
}
