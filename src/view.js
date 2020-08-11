// import dragData from 'avid-drag-data';
// import request, {GET, POST} from "./requests"
import ReactDOM from "react-dom"
import React from "react"
import {SampleContainer} from "./ui/SampleContainer";

export default class View {
    constructor(avid_api) {
        this.avid_api = avid_api
    }

    onInit(config, {dispatch}) {
        // this.innerDispatch = dispatch;
        // this.state = config.state;
    }

    onRender({domElement}) {
        ReactDOM.render(
            <SampleContainer avid={this.avid_api}/>,
            domElement
        )
    }

    onDestroy(data) {
    }

    onRevalidate(data) {
    }

    onFocusLost() {
    }

    onFocusGained(event) {
    }

    enqueueLoading(promise) {
    }

    name(newName) {
        return '';
    }

    isShown() {
        return true;
    }

    isVisible() {
        return true;
    }

    closeAllowed() {
        return true;
    }

    destroy() {
    }

    getMinHeight() {
        return 50;
    }

    getMinWidth() {
        return 50;
    }

    getTitle() {
        return "Sample App";
    }

    get publicScope() {
        return {
            getTitle: this.getTitle.bind(this)
        };
    }
}
