class Response {
    errorGeneric(data = [], devMessage, clientMessage = "Something went wrong, please try again in sometime!") {
        return (res) => {
            return res.status(500).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    errorCustom(data = [], devMessage, clientMessage) {
        return (res) => {
            return res.status(500).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    errorNotFound(data = [], devMessage, clientMessage = "The requested resource was not found on the server!") {
        return (res) => {
            return res.status(404).send({
                success: false,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    successFetch(data = [], devMessage = "Data fetched successfully", clientMessage = "The requested resource was fetched successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    successCreate(data = [], devMessage = "Data created successfully", clientMessage = "The requested resource was created successfully") {
        return (res) => {
            return res.status(201).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    editSuccess(data = [], devMessage = "Data updated successfully", clientMessage = "The requested resource was updated successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    deleteSuccess(data = [], devMessage = "Data deleted successfully", clientMessage = "The requested resource was deleted successfully") {
        return (res) => {
            return res.status(200).send({
                success: true,
                data,
                devMessage,
                clientMessage,
            });
        };
    }

    validationError(data = []) {
        return (res) => {
            return res.status(400).send({
                success: false,
                data,
                devMessage: "Validation error",
                clientMessage: "The request was invalidated, please try again!",
            });
        };
    }

    errorUnauthorized(data = []) {
        return (res) => {
            return res.status(401).send({
                success: false,
                data,
                devMessage: "Unauthorized access",
                clientMessage: "You are not authenticated, please login and try again!",
            });
        };
    }

    errorForbidden(data = []) {
        return (res) => {
            return res.status(403).send({
                success: false,
                data,
                devMessage: "Forbidden access",
                clientMessage: "You are not authorized to view this resource!",
            });
        };
    }

    errorServer(data = [], devMessage = "Internal server error", clientMessage = "An unexpected error occurred") {
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