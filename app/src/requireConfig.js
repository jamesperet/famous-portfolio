/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-bkimagesurface': '../lib/famous-bkimagesurface/BkImageSurface',
        jquery: '../lib/jquery/dist/jquery',
        defiant: '../lib/defiant.js/dist/defiant-latest.min',
        preloadjs: '../lib/preloadjs/dist/preload'
    },
    packages: [
        {
            name: 'jmespath.js',
            main: 'jmespath.js',
            location: '../lib/jmespath.js'
        }
    ]
});
require(['main']);
