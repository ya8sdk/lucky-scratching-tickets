import Response from "./Response"

export function errorHandle(error: Error, req, res) {
    if (error.message == 'product doesnt exists') {
        Response.methodNotAllowed(req, res, error.message, null)
    } else if (error.message == 'amount cannot be smaller then 1') {
        Response.badRequest(req, res, error.message, null)
    } else if (error.message == 'purchaseID of product did not found.') {
        Response.notFound(req, res, error.message, null)
    } else if (error.message == 'card already scratched, try another card.' || error.message == 'product already used, please try another one.') {
        Response.notFound(req, res, error.message, null)
    } else {
        Response.serverError(req, res, error.message, null)
    }
}

