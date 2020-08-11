import React, {useState, useEffect} from 'react'

export function PlayerControl({avid}) {
    const [frame, setFrame] = useState(0)

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

    return (
        <div style={rowItem}>
            <a href="#" onClick={play}>Play</a>
            <a href="#" onClick={setInOut}>SetMarks</a>
            <div>{frame}</div>
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