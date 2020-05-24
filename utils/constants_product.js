const response = {
    "Errors": [
        {
            "NotFound": {
                "Error": true,
                "ErrorCode": 404,
                "ErrorMessage": "The Requested Product was not found"
            },
            "AdditionFailed": {
                "Error": true,
                "ErrorCode": 500,
                "ErrorMessage": "Adding the Product failed."
            },
            "ValidationError": {
                "Error": true,
                "ErrorCode": 401
            }
        }]
}

exports.response = response;