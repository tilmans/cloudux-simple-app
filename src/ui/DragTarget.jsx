import React, {useState} from 'react'

export function DragTarget({avid}) {
    const [dragData, setDragData] = useState({})

    function dragenter(e) {
        setDragData(avid.getDragData)
        console.log("DRAG DATA", avid.getDragData())
    }

    return (
        <div style={rowItem}>
            <div onDragEnter={dragenter} style={sampleLeft}>
                <div style={textCenter}>Drag something here</div>
            </div>
            <div style={sampleRight}>{JSON.stringify(dragData, null, 2)}</div>
        </div>
    )
}

const rowItem = {
    display: "flex",
    flexDirection: "row",
    spacing: "10px",
    height: "100px",
    width: "100%",
}

const sampleLeft = {
    width: "100px",
    flexGrow: 0,
    flexShrink: 0,
    alignContent: "center"
}

const textCenter = {}

const sampleRight = {
    flexGrow: 1
}