class Response {
    static errorGeneric(data = [], devMessage, clientMessage = "Something went wrong, please try again in sometime!") {
        return (res) => {
            return res.status(500).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static errorCustom(data = [], devMessage, clientMessage) {
        return (res) => {
            return res.status(500).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static errorNotFound(data = [], devMessage, clientMessage = "The requested resource was not found on the server!") {
        return (res) => {
            return res.status(404).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static successFetch(data = [], devMessage = "Data fetched successfully", clientMessage = "The requested resource was fetched successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static successCreate(data = [], devMessage = "Data created successfully", clientMessage = "The requested resource was created successfully") {
        return (res) => {
            return res.status(201).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static editSuccess(data = [], devMessage = "Data updated successfully", clientMessage = "The requested resource was updated successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static deleteSuccess(data = [], devMessage = "Data deleted successfully", clientMessage = "The requested resource was deleted successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    static validationError(data = []) {
        return (res) => {
            return res.status(400).send({
                success: false,
                data,
                devMessage: "Validation error",
                clientMessage: "The request was invalidated, please try again!",
            });
        };
    }

    static errorUnauthorized(data = []) {
        return (res) => {
            return res.status(401).send({
                success: false,
                data,
                devMessage: "Unauthorized access",
                clientMessage: "You are not authenticated, please login and try again!",
            });
        };
    }

    static errorForbidden(data =[]) {
        return (res) => {
            return res.status(403).send({
                success: false,
                data,
                devMessage: "Forbidden access",
                clientMessage: "You are not authorized to view this resource!",
            });
        };
    }

    static errorServer(data = [], devMessage = "Internal server error", clientMessage = "An unexpected error occurred") {
        return (res) => {
            return res.status(500).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }
}

module.exports = Response