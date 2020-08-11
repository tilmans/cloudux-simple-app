export default function createWrapper(assetEditor, mode) {
    if (mode !== "Source" && mode !== "Output")
        throw "Unexpected mode, should be Source or Output"

    const internalPlayer = assetEditor["DEPRECATED_DO_NOT_USE"].getPlayerApiSingleton()
    const listeners = []

    function onFrameChange(callback) {
        listen("AVPlayerPosition", data => {
            callback(data.frames)
        })
    }

    function listen(event, callback) {
        listeners.push([event, callback])
        internalPlayer.listen(event, callback)
    }

    function cleanup() {
        console.info("Unregister all listeners")
        listeners.forEach(([event, callback]) => internalPlayer.unlisten(event,callback))
    }

    function getPlayerContext() {
        return assetEditor.getContext(mode)
    }

    function getCurrentFrame() {
        return assetEditor.getCurrentFrameNumber(mode)
    }

    function play() {
        console.log("ASSET EDIT", assetEditor)
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
        getPlayerContext:getPlayerContext,
        getCurrentFrame:getCurrentFrame,
        play:play,
        setMarks:setMarks,
        getInPoint:getInPoint,
        getOutPoint:getOutPoint,
        onFrameChange:onFrameChange,
        cleanup:cleanup,

    }
}