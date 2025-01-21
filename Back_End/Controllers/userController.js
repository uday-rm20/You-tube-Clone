import User from '../Models/user.js'; /* importing User model schema */
import bcrypt from "bcryptjs"; /* to encrypt the password */
import jwt from "jsonwebtoken";


const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
}/* configuring cookies for client/server side operations like JWT token verification */

/* Asynchronous function to signup a user by taking required details  */

export const signUp = async(req, res) => {
    try{
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({userName});
        if(isExist){
            res.status(400).json({error: "username already exists please try a new username"});
        }else{
            const updatedPass = await bcrypt.hash(password, 10);
            const user = new User({channelName, userName, about, profilePic, password: updatedPass});
            await user.save();
            res.status(201).json({message: "User registered successfully", success: "yes", data:user});

        }

    }catch(error){
        res.status(500).json({error: "server error"}); /* error handling  */

    }
}

/* Asynchronous Function to signIn a registered user */
export const signIn = async(req, res) => {
    try{
        const { userName, password } = req.body;
        const user = await User.findOne({userName});

        /* password hashing to secure user credentials */
        if(user && await bcrypt.compare(password, user.password) ){

            const token = jwt.sign({ userId: user._id}, 'uday_jwt_key'); /* secret key verification */
            res.cookie('token', token, cookieOptions);
            res.json({message: "Logged in Successfully", success: "true", token, user });
        }else{
            res.status(400).json({error: "Invalid Credentials"});
        }

    }catch(error){
        res.status(500).json({error: "server error"}); /*error handling  */

    }
}

/* function for logout from the account  */
export const logout = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({message: "Logged Out Successfully"});

}
/*It clears the authenticate cookie from the server-side to logout the user.*/

