const morgan = require("morgan");

morgan.token("logger", (req, res) => {
    console.log({
        TIMESTAMP: new Date().toISOString(),
        METHOD: req.method,
        API_URL: req.url,
        STATUS: res.statusCode,
        HEADERS: req.headers,
        USER: req.user ? req.user.id : "Not authenticated",
        REQUEST_BODY: req.method !== "GET" ? req.body : null,
    });

    return "";
});

module.exports = {
    logger: morgan(":logger")
};