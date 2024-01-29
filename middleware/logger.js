const morgan = require("morgan");
const { print } = require("../utils");
const fs = require('fs');
const path = require('path');

morgan.token("logger", (req, res) => {
    const formattedDate = getFormattedDate();
    
    const log = JSON.stringify({
        TIMESTAMP: new Date().toISOString(),
        METHOD: req.method,
        API_URL: req.url,
        STATUS: res.statusCode,
        HEADERS: req.headers,
        USER: req.user ? req.user.id : "Not authenticated",
        REQUEST_BODY: req.method !== "GET" ? req.body : null,
    });

    print(log, "LOG");

    const fileName = path.join("./docs", `${formattedDate}.txt`);

    if (!fs.existsSync(fileName)) {
        // If the file doesn't exist, create it
        fs.writeFileSync(fileName, '');
    }

    fs.appendFileSync(fileName, log);

    return "";
});

module.exports = {
    logger: morgan(":logger")
};

function getFormattedDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yy = String(today.getFullYear()).slice(-2);

    return `${dd}-${mm}-${yy}`;
}
