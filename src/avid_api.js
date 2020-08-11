import avidDragData from 'avid-drag-data';
import avid_player_api from "./avid_player_api";

export function api() {
    let dispatcher = null
    let assetEditor = null
    let commonEdit = null
    let dataProviders = null
    let player = null

    function setContext(context) {
        if (dispatch == null) {
            console.error("Dispatcher was not set")
        }
        dispatcher(context)
    }

    function getDragData() {
        return avidDragData.getDataTransfer();
    }

    return {
        setDispatcher: newDispatcher => dispatcher = newDispatcher,
        setContext: (context) => setContext(context),
        getDragData: getDragData,
        setAssetEditor: (newAssetEditor) => {
            assetEditor = newAssetEditor;
            player = avid_player_api(assetEditor, "Source")
        },
        setCommonEdit: (newCommonEdit) => commonEdit = newCommonEdit,
        setDataProviders: (newDataProviders) => dataProviders = newDataProviders,
        getPlayer: () => player,
    }
}