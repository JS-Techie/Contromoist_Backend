const jwt = require('jsonwebtoken');
const { Response, print } = require("../utils")

class Auth {
    static login = async (req, res, next) => {
        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });
            if (!user) {
                return Response.errorNotFound()
            }

            // Check if password is valid

            // If authentication is successful, generate a JWT token
            // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

            // Send a success response with the token
            return Response.successFetch(token, "Login successful", "You were successfully logged in!")

        } catch (error) {
            print(str(error), "ERROR")
            return Response.errorServer([], str(error), "Something went wrong, please try again in sometime!")
        } finally {
            print("Login controller execution successful", "LOG")
        }
    }
}

module.exports = Auth;
