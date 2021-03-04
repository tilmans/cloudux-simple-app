import React, {useState, useEffect} from 'react'

export function PlayerControl({avid}) {
    const [frame, setFrame] = useState(0)
    const [inPoint, setInPoint] = useState(0)
    const [outPoint, setOutPoint] = useState(0)
    const [monitor, setMonitor] = useState("Source")

    const frameCallback = frame => {
        setFrame(frame)
    }
    const monitorCallback = data => {
        setMonitor(data.monitor)
    }

    const delayedRegister = () => {
        const player = avid.getPlayer()
        if (player == null) {
            window.setTimeout(delayedRegister, 100)
        } else {
            player.onFrameChange(frameCallback)
            player.onMonitorModeChange(monitorCallback)
            setMonitor(player.getCurrentMonitor())
        }
    }

    useEffect(() => {
        delayedRegister()
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

    function toggleSequence(e) {
        avid.toggleTimeline()
    }

    function toggleMonitor(e) {
        const player = avid.getPlayer()
        const now = player.getCurrentMonitor()
        if (now === "Source") {
            player.setCurrentMonitor("Output")
        } else {
            player.setCurrentMonitor("Source")
        }
    }

    function setCurrentFrame(e) {
        avid.getPlayer().setCurrentFrame(20)
    }

    function play(e) {
        avid.getPlayer().play()
    }

    function stop(e) {
        avid.getPlayer().stop()
    }

    return (
        <div style={rowItem}>
            <button onClick={play}>Play</button>
            <button onClick={stop}>Stop</button>
            <button onClick={setCurrentFrame}>Set Frame</button>
            <div>Current Frame: {frame}</div>
            <button onClick={setInOut}>SetMarks</button>
            <button onClick={getInOut}>Get In/Out</button>
            <div>In: {inPoint}, Out: {outPoint}</div>
            <button onClick={toggleSequence}>Sequence</button>
            <div>Active Monitor: {monitor}</div>
            <button onClick={toggleMonitor}>Monitor</button>
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