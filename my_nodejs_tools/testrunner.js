'use strict';

process.env.ENV = 'dev'; // valid values dev,qa,prod
process.env.ENV2 = 'local'; // must be same always

const fs = require('fs');
const expect = require('chai').expect;

// NOTE: 
//      Check the location of below files
const testcaseValues = require('./testcases' + ((process.env.ENV.startsWith('dev')) ? '' : '-' + process.env.ENV));
const requestMain = require('./src/server');

if (process.stdout._handle) {
    process.stdout._handle.setBlocking(true);
}

let TEST_OUTPUT_DIRECTORY = './unittest__output__responses/';
let TEST_INPUT_DIRECTORY = './unittest__input__messages';

//
let context = console;
//
context.log.verbose = context.log;
context.log.info = context.log;
//
context.log.warn = context.error;
context.log.error = context.error;
//

let elog = false;
let ilog = false;
let vlog = false;
let ccov = false;

if (process.argv.indexOf('--elog=1') !== -1) {
    elog = true;
} else if (process.argv.indexOf('--ilog=1') !== -1) {
    ilog = true;
} else if (process.argv.indexOf('--vlog=1') !== -1) {
    vlog = true;
}

if (process.argv.indexOf('--ccov=1') !== -1) {
    ccov = true;
}

context.log("elog: ", elog);
context.log("ilog: ", ilog);
context.log("vlog: ", vlog);
context.log("ccov: ", ccov);

if (vlog) {
    // all logging required
}
else if (ilog) {
    // no verbose logging required
    context.log.verbose = function () { };
} else if (elog) {
    // no verbose & info logging required
    context.log.verbose = function () { };
    context.log.info = function () { };
}



describe('unit testing: ' +
    require('path').basename(__filename), function () {

        describe('\nValid scenarios: 200 status code: ', function () {

            [
                ////// valid
                testcaseValues.validScenarioArray_1[0],  // abc
                //..

                ////// invalid
                testcaseValues.invalidScenarioArray_1[0], // xyz
                //..
            ]
                .forEach(function (validScenario) {

                    it(JSON.stringify(validScenario.input) + ' -> ' +
                        JSON.stringify(validScenario.output.data.details[0]),
                        function () {

                            context.log.error("TEST RUNNER: validScenario.input: ", validScenario.input);

                            return new Promise((resolve, reject) => {

                                context.done = function () {
                                    ////context.log.verbose('\n==UNIT TEST RESULTS===========');
                                    //context.log.verbose('testrunner - context.res.status');
                                    //context.log.verbose(context.res.status);
                                    //context.log.verbose('testrunner - context.res.body');
                                    //context.log.verbose(context.res.body);
                                    try {
                                        expect(JSON.stringify(context.res.status))
                                            .to.have.string(
                                            validScenario.output.data.httpStatusCode);
                                        expect(JSON.stringify(context.res.body))
                                            .to.not.have.string(
                                            validScenario.output.data.details[0].key_not_to_present);
                                        expect(JSON.stringify(context.res.body))
                                            .to.have.string(
                                            validScenario.output.data.details[0].key_to_present);

                                        let outputFile =
                                            TEST_OUTPUT_DIRECTORY +
                                            validScenario.input.filename.toString();

                                        fs.writeFile(outputFile,
                                            JSON.stringify(context.res.body, null, 4), function (err) {
                                                if (err) {
                                                    context.log.info(err);
                                                }

                                                //context.log.verbose(outputFile, "saved!");
                                            });
                                    } catch (e) {
                                        return reject(e);
                                    }

                                    context.log('\n');
                                    return resolve('done');
                                };
                                try {
                                    let mySbMsg = validScenario.input;
                                    // context.done will be called
                                    requestMain(context, mySbMsg);
                                } catch (err) {
                                    return reject(err);
                                }
                            });
                        });
                });
        });
    }
);
