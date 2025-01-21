import express from "express";
import { logout, signIn, signUp } from "../Controllers/userController.js";

const router = express.Router(); /* express.Router helps to create new routes  */


router.post("/signUp", signUp); /* defining route for user signup*/
router.post("/login", signIn); /* defining route for user signIn */
router.post("/logout", logout); /* definig route for user logout */




export default router;