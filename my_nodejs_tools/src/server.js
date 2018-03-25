'use strict';

/*
To test this

ONE TIME INSTALLATION ONLY

    install Visual Studio Community 2017
        https://www.visualstudio.com/downloads/

    install below plugins for Visual Studio Community 2017
        https://marketplace.visualstudio.com/items?itemName=mynkow.FormatdocumentonSave            - format code on save
        https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner           - for npm tools from package.json for task runner
        https://marketplace.visualstudio.com/items?itemName=MichaelObermeyer.DocStubsJs2017        - for js doc

    install npm modules global:
        npm install eslint -g
        npm install mocha -g
        npm install -g nyc

Run test

    1. Open the project in Visual studio 2017 - Community edition
    2. Press   Ctrl+Alt+Backspace   to open Task Runner Explorer

    3. Double click on below (individual commands)
            1.0_Install         this install npm modules in   both current folder, src folder
            2.1_Lint            this runs linter, show errors in code, to avoid an error on a particular line, we can ues comments like   // eslint-disable-line no-unused-vars
            2.2_Test            this runs npm test to test your code
            2.3_Codecoverage    this runs code coverage, which will tell you above tests cover all of your code (each function, if, else, etc.)

            NOTE:
                "Process terminated with code 0." means successful
                All above generates verbose log  in vlog.txt

        You can also Double click on below (full)
            3.1__errlog__Lint+Test+_CodeCoverage    this will do all above individual commands, and also generates vlog.txt (verbose - all log lines)
            3.2__inflog__Lint+Test+_CodeCoverage    this will do all above individual commands, and also generates ilog.txt (info - all log lines, but no verbose)
            3.3__verlog__Lint+Test+_CodeCoverage    this will do all above individual commands, and also generates elog.txt (error - all log lines, but no verbose & info)

*/

var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);


module.exports = function requestMain(context, input) {

    return doMain();

    function doMain() {

        func1();
        func2();


        if (input.isGood === "true") {
            context.res = {
                status: 200,
                body: {
                    status: 'OK',
                    description: "doMain executed successfully."
                }
            };
        }
        else {
            context.res = {
                status: 500,
                body: {
                    status: 'ERROR',
                    description: 'error occured while executing doMain.',
                    reason: 'isGood came as false'
                }
            };
        }



        context.done();
    }

    function func1() {
        context.log.verbose('func1 - hello world - verbose');
        context.log.info('func1 - hello world - info');
        context.log.warn('func1 - hello world - warn');
        context.log.error('func1 - hello world - error');
    }

    function func2() {
        context.log.verbose('func2 - hello world - verbose');
        context.log.info('func2 - hello world - info');
        context.log.warn('func2 - hello world - warn');
        context.log.error('func2 - hello world - error');
    }

};  // requestMain
