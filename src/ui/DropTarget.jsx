import React, {useState} from 'react'

export function DropTarget({avid}) {
    const [dropData, setDropData] = useState({})

    function drop(e) {
        const drop = e.dataTransfer
        const data = {}
        for (const item of drop.items) {
            console.log("Item", item)
            data[item.type] = drop.getData(item.type)
        }
        setDropData(data)
    }

    return (
        <div style={rowItem}>
            <div onDrop={drop} style={sampleLeft}>
                <div style={textCenter}>Drop something here</div>
            </div>
            <div style={sampleRight}>{JSON.stringify(dropData, null, 2)}</div>
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