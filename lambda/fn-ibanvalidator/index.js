const IBAN = require("iban");

async function handler(event, context) {
    try {
        var response = {
            "valid": IBAN.isValid(event.pathParameters.iban)
        }

        return returnResponse(200, response)
    }
    catch (error) {
        return returnResponse(500, error.message)
    }
}

const returnResponse = function(status, message) {
    return {
        "statusCode": status,
        "body": JSON.stringify(message),
        "headers": {
            "Content-Type": "application/json"
        }
    }
}

module.exports = {
    handler
}
