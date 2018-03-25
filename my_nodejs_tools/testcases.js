"use strict";
/* eslint quotes: ["error", "double"] */
/* gjslint --disable 0131  spec-values.js */

module.exports = {

    "validScenarioArray_1": [
        {
            "input": {
                "isGood": "true",
                "filename": "success_test___abc",
                "att1": "value1",
                "att2": "value2",
                "att3": "value3"
            },
            "output": {
                "data": {
                    "httpStatusCode": 200,
                    "details": [
                        {
                            "key_not_to_present": "FAILURE",
                            "key_to_present": "successfully"
                        }
                    ]
                }
            }
        },
    ],

    "invalidScenarioArray_1": [
        {
            "input": {
                "isGood": "false",
                "filename": "fail_test___xyz",
                "att1": "value1",
                "att2": "value2",
                "att3": "value3"
            },
            "output": {
                "data": {
                    "httpStatusCode": 500,
                    "details": [
                        {
                            "key_not_to_present": "\"Successful\"",
                            "key_to_present": "error"
                        }
                    ]
                }
            }
        },
    ]
};