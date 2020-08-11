/**
 * Copyright 2019 by Avid Technology, Inc.
 */
import appConfig from './package.json';
import {avid} from "./index";

const viewName = `${appConfig.identity.appName}-view`;

export default class App {
    constructor(avid_api, config) {
        this.avid_api = avid_api
        this.config = config
    }

    getLayoutConfig() {
        return {
            type: viewName,
            state: this.state,
        };
    }

    onInit({ dispatch }) {
        this.dispatch = dispatch;
        this.avid_api.setDispatcher(dispatch)
    }

    onRender(headerContentEl, views) {
        this.innerView = Object.assign({}, views[viewName]);
        // this.innerView.setDispatch(this.dispatch);
        // this.innerView.trigger = (data) => {
        //     console.log("View change", data);
        // }
        this.headerContentEl = headerContentEl;
    }

    onShow() {
        console.log('[ExamplePlugin] onShow');
    }

    onClose() {
        console.log('[ExamplePlugin] onClose');
        return Promise.resolve();
    }

    onHide() {
        console.log('[ExamplePlugin] onHide');
    }

    onUnrender() {
        console.log('[ExamplePlugin] onUnrender');
    }

    onBeforeUnrender() {
        console.log('[ExamplePlugin] onBeforeUnrender');
    }

    onDestroy() {
        console.log('[ExamplePlugin] onDestroy');
        const player = this.avid_api.getPlayer()
        if (player) {
            player.cleanup()
        }
    }

    setContext(context) {
        console.log('[ExamplePlugin] context', context);
    }

    getTitle() {
        return this.innerView.getTitle();
    }

    get publicScope() {
        return {};
    }
}
