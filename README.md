# CloudUX Simple App
This is an example application that covers some of the Cloud UX APIs.
Be aware that many of these APIs are not considered stable and will
change without notice.

## General project setup
This sample does not use the webpack setup provided by Avid, instead
it uses a minimal `webpack.config.js` that covers the basics and
has no publishing functionality. The API uses one library that is 
provided by CloudUX so you have to configure Webpack to include it
as a dependency at runtime. In Webpack this is done with 

        externals: [
            'avid-drag-data'
        ],

If you use a different bundler you will have to find the corresponding
way to do this.

For testing I use [HTTP Toolkit](https://httptoolkit.tech/) which can 
mock responses. For details see below.

## General usage
There is no standard way to access the dependencies across the parts
of the App and Views. In this example I use a single API object that
collects all of the different API endpoints and makes them accessible 
via a single object. See `avid_api.js` and the setup in `index.js`.

## HTTP Toolkit setup
Go to the mock settings and add rules for the following:

`.*\/app-sample\/index\.js` -> redirect to build/index.js   
`.*\/apis\/avid.plugins.list;version=0;realm=global\/plugins` -> redirect 
to plugins.json


