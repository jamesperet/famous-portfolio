/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-bkimagesurface': '../lib/famous-bkimagesurface/BkImageSurface'
    },
    packages: [

    ]
});
require(['main']);
