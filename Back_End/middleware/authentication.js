import jwt from "jsonwebtoken";
import User from '../Models/user.js';

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    } else {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: "Token is not valid" });
        }
    }
};
