class Response {
    constructor() {
    }

    static success(req, res, message, data) {
        res.status(200).json({
            data,
            code: 200,
            message: message || 'success',

        });
    }

    static badRequest(req, res, message, data) {
        res.status(400).json({
            code: 400,
            message: message || 'The server cannot or will not process the request due to an apparent client error.',
            data: data,
        });
    }

    static notFound(req, res, message, data) {
        res.status(404).json({
            code: 404,
            message: message || 'Resource not found',
            data: data,
        });
    }

    static methodNotAllowed(req, res, message, data) {
        res.status(405).json({
            code: 405,
            message: message || 'Method Not Allowed',
            data: data,
        });
    }

    static gone(req, res, message, data) {
        res.status(410).json({
            code: 410,
            message: message || 'The server cannot or will not process the request due to an apparent client error.',
            data: data,
        });
    }

    static serverError(req, res, message, data) {
        res.status(500).json({
            code: 500,
            message: message || 'internal server error',
            data: data,
        });
    }
}

export default Response;