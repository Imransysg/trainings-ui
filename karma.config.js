// Karma configuration
// Generated on Wed Jun 11 2014 09:51:52 GMT-0500 (CDT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/auth0-lock/build/lock.js',
            'bower_components/angular-lock/angular-lock.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-recaptcha/release/angular-recaptcha.js',
            'bower_components/auth0.js/build/auth0.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular-flexslider/angular-flexslider.js',
            'bower_components/angular-data-grid/dist/pagination.min.js',
            'bower_components/angular-data-grid/dist/dataGrid.min.js',
            'bower_components/jquery.nicescroll/jquery.nicescroll.min.js',
            'bower_components/angular-md/dist/angular-md.min.js',
            'bower_components/angular-nicescroll/angular-nicescroll.js',
            'bower_components/angular-payments/lib/angular-payments.js',
            'bower_components/underscore/underscore.js',
            'bower_components/angular-guid/guid.min.js',
            'bower_components/pubnub/dist/web/pubnub.js',
            'bower_components/pubnub-angular/dist/pubnub-angular.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-toastr/dist/angular-toastr.js',
            'src/app/ansi-to-html.js',
            'src/app/jquery.base64.js',
            'src/app/app.module.js',
            'src/app/app.constants.js',
            'src/app/app.config.js',
            'src/app/app.routes.js',
            'src/app/app.run.js',            
            'src/app/models/*.js',
            'src/app/services/*.js',
            'src/app/directives/**/*.js',
            'src/app/components/**/*.js',
            'test/testUtils.js',
            'src/app/directives/**/*.html',
            'test/specs/**/*.spec.js',
        ],

        // list of files to exclude
        exclude: [

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

        preprocessors: {
            'src/app/directives/**/*.html': ['ng-html2js'],
             'src/app/**/**/*.js': ['coverage']

        },

        ngHtml2JsPreprocessor: {
            // moduleName: 'templates',
            stripPrefix: 'src/',
            // prependPrefix: 'app/',
            //             cacheIdFromPath: function(filepath) {

            // // we want our view to begin with "/views"
            // alert(filepath)
            // return filepath.replace("app/", "/");

            // } 
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage'],
        coverageReporter: {
            includeAllSources: true,
            type: 'html',
            dir: 'coverage/'
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
           'karma-coverage'
        ],
        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [

            //'PhantomJS'
            'Chrome'

            // , 'Firefox'
            // , 'Safari'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};