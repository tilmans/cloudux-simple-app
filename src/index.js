/**
 * Copyright 2018 by Avid Technology, Inc.
 */

import appConfig from './package.json';

import App from "./app";
import View from "./view";

import {api} from "./avid_api"

const avid_api = api()

export const avid = [
    {
        name: `${appConfig.identity.appName}-view`,
        provides: ['appViews'],
        create: () => ({
            config: {},
            factory: () => {
                return new View(avid_api);
            },
            // _proto: new View(api),
        }),
    },
    {
        name: appConfig.identity.appName,
        provides: ["apps"],
        // requires: ["asset-editor-api"],
        create: (deps, meta) => {
            console.log("Deps",deps,meta)
            return {
                factory: (config) => {
                    return new App(avid_api, config)
                },
                config: {
                    dockable: false,
                    isMultiInstance: true,
                    title: "app-sample",
                },
                menuIcon: {
                    group: 200,
                    orderInGroup: 200,
                    title: appConfig.identity.appName,
                    gradient: ['#ba2f82', '#cf4c85'],
                }
            }
        }
    },
    {
        processes: ['asset-editor-api'],
        process: deps => {
            if (!deps['asset-editor-api'][0]) {
                return;
            }
            deps['asset-editor-api'][0].then(assetEditor => avid_api.setAssetEditor(assetEditor));
        },
    },
    {
        requires: { 'common-edit': '1' },
        create: deps => {
           avid_api.setCommonEdit(deps['common-edit'][0]);
        },
        start: true,
    },
    {
        requires: { 'dataprovider-registry': '1' },
        create: deps => {
            avid_api.setDataProviders(deps['dataprovider-registry'][0]);
        },
        start: true,
    },
];
