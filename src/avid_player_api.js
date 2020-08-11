export default function createWrapper(assetEditor, mode) {
    if (mode !== "Source" && mode !== "Output")
        throw "Unexpected mode, should be Source or Output"

    const internalPlayer = assetEditor["DEPRECATED_DO_NOT_USE"].getPlayerApiSingleton()
    const listeners = []
    const monitors = []
    let playerController = null

    function onFrameChange(callback) {
        listen("AVPlayerPosition", data => {
            callback(data.frames)
        })
    }

    function onMonitorModeChange(callback) {
        monitors.push(internalPlayer.onMonitorChange(data => {
            callback({
                ...data,
                monitor: normalizeMonitorName(data.monitor),
            })
        }))
    }

    function normalizeMonitorName(name) {
        return name === "Asset" ? "Source" : name
    }

    function denormalizeMonitorName(name) {
        return name === "Source" ? "Asset" : name
    }

    function getCurrentMonitor() {
        return normalizeMonitorName(internalPlayer.getShownMonitor())
    }

    function setCurrentMonitor(name) {
        if (playerController == null) {
            playerController = internalPlayer.getPlayerController()
        }
        playerController.setMonitor(denormalizeMonitorName(name))
    }

    function listen(event, callback) {
        listeners.push([event, callback])
        internalPlayer.listen(event, callback)
    }

    function cleanup() {
        console.info("Unregister all listeners")
        listeners.forEach(([event, callback]) => internalPlayer.unlisten(event,callback))
        monitors.forEach(monitor => monitor())
    }

    function getPlayerContext() {
        return assetEditor.getContext(mode)
    }

    function getCurrentFrame() {
        return assetEditor.getCurrentFrameNumber(mode)
    }

    function setCurrentFrame(frame) {
        return assetEditor.setCurrentFrameNumber(mode, frame)
    }

    function setMarks(markin, markout) {
        assetEditor.setMarks(markin, markout, mode)
    }

    function getInPoint() {
        return assetEditor.getMarkIn(mode)
    }

    function getOutPoint() {
        return assetEditor.getMarkOut(mode)
    }

    return {
        getPlayerContext,
        getCurrentFrame,
        setCurrentFrame,
        setMarks,
        getInPoint,
        getOutPoint,
        onFrameChange,
        cleanup,
        internalPlayer,
        onMonitorModeChange,
        getCurrentMonitor,
        setCurrentMonitor,
    }
}