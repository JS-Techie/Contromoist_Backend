const morgan = require("morgan");
const {print} = require("../utils")

morgan.token("logger", (req, res) => {
    print(JSON.stringify({
        TIMESTAMP: new Date().toISOString(),
        METHOD: req.method,
        API_URL: req.url,
        STATUS: res.statusCode,
        HEADERS: req.headers,
        USER: req.user ? req.user.id : "Not authenticated",
        REQUEST_BODY: req.method !== "GET" ? req.body : null,
    }),"LOG");

    return "";
});

module.exports = {
    logger: morgan(":logger")
};