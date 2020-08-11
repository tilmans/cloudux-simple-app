import React, {useState, useEffect} from 'react'

export function PlayerControl({avid}) {
    const [frame, setFrame] = useState(0)
    const [inPoint, setInPoint] = useState(0)
    const [outPoint, setOutPoint] = useState(0)

    const frameCallback = frame => {
        setFrame(frame)
    }
    const delayedRegister = () => {
        const player = avid.getPlayer()
        if (player == null) {
            window.setTimeout(delayedRegister, 100)
        } else {
            player.onFrameChange(frameCallback)
        }
    }

    useEffect(() => {
        delayedRegister()
        return () => {
            avid.getPlayer().unregister(frameCallback)
        }
    }, [])

    function play(e) {
        avid.getPlayer().play()
    }

    function setInOut(e) {
        avid.getPlayer().setMarks(10, 500)
    }

    function getInOut(e) {
        setInPoint(avid.getPlayer().getInPoint())
        setOutPoint(avid.getPlayer().getOutPoint())
    }

    return (
        <div style={rowItem}>
            <button onClick={play}>Play</button>
            <button onClick={setInOut}>SetMarks</button>
            <div>Current Frame: {frame}</div>
            <button onClick={getInOut}>Get In/Out</button>
            <div>In: {inPoint}, Out: {outPoint}</div>
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