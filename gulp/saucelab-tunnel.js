

var config = require('./config');

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var path = require('path');
var protractor = require("gulp-protractor").protractor;
var SauceTunnel = require('../src/libs/sauce-tunnel');
// const http = require('http');
// const connect = require('connect');
// const serveStatic = require('serve-static');
//const Launcher = require('webdriverio/build/lib/launcher');

//const wdio = new Launcher('protractor/protractor.config.js');

// var tunnel;

//gulp.task('sauce-start',['serve'], function (cb) {
gulp.task('sauce-start', function (cb) {
    tunnel = new SauceTunnel("newgen_lab", "6e257a1e-327c-4ba1-b438-8e3288a8dd69", 'testtunnel');
    // >>>> Enhance logging – this function was adapted from that Node plugin for Grunt, which runs grunt-mocha-wd.js
    var methods = ['write', 'writeln', 'error', 'ok', 'debug'];
    methods.forEach(function (method) {
        tunnel.on('log:' + method, function (text) {
            console.log(method + ": " + text);
        });
        tunnel.on('verbose:' + method, function (text) {
            console.log(method + ": " + text);
        });
    });
    // <<<< End enhance logging

    tunnel.start(function (isCreated) {
        debugger;
        if (!isCreated) {
            console.log("status" + isCreated)
            cb('Failed to create Sauce tunnel.');
        }
        console.log("Connected to Sauce Labs.");
        cb();
    });
});

gulp.task('sauce-end', function (cb) {
    tunnel.stop(function () {
        cb();
    });
});

// gulp.task('http', done => {
//   const app = connect().use(serveStatic('test/fixtures'));
//   httpServer = http.createServer(app).listen(9000, done);
// });

// gulp.task('e2e', ['http'], () => {
//   return wdio.run(code => {
//     process.exit(code);
//   }, error => {
//     console.error('Launcher failed to start the test', error.stacktrace);
//     process.exit(1);
//   });
// });

// gulp.task('teste', ['e2e'], () => {
//   httpServer.close();
// });

gulp.task('sauce-test', ['sauce-start'], function () {
    gulp.src('test/e2e/specs/**/*.protractor.spec.js')
        .pipe(protractor({
            configFile: 'protractor/protractor.config.js',
            
        }).on('error', function (e) {
            throw e;
        }).on('end', function () {
            console.log('Stopping the server.');
            gulp.run('sauce-end');
        }));
});