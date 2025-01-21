import jwt from "jsonwebtoken";
import User from '../Models/user.js';


/* authenticate is an Asynchronous function which handles the midddlware part to see only authorized users access the restricted features */

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    } else {
        try {
            const decode = jwt.verify(token, "uday_jwt_key");
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: "Token is not valid" });
        }

    }
};

/* it check the validity of JWT token in the cookies to authenticate user */