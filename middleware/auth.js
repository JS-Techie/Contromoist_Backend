const jwt = require('jsonwebtoken');
const { Response } = require("../utils")

const secretKey = process.env.JWT_SECRET


const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token.startsWith('Bearer')) {
        return Response.errorCustom(devMessage = "Bearer carrier incorrect / not present", clientMessage = "You could not be authenticated, please try again!")
    }

    if (!token) {
        return Response.errorCustom(devMessage = "No token present in header", clientMessage = "You could not be authenticated, please try again!")
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2) {
        return Response.errorCustom(devMessage = "Token malformed / Not present", clientMessage = "You could not be authenticated, please try again!")
    }

    const [scheme, tokenValue] = tokenParts;

    if (!/^Bearer$/i.test(scheme)) {
        return Response.errorCustom(devMessage = "Token malformed", clientMessage = "You could not be authenticated, please try again!")
    }

    try {
        req.user = jwt.verify(tokenParts[1], secretKey)
        next();

    } catch (error) {
        return Response.errorUnauthorized()
    }

};

module.exports = authenticate;
