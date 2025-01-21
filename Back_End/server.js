import express from 'express';
import connectDB from './Connection/config.js';
import userRoutes from './Routes/userRoutes.js';
import videoRoutes from './Routes/videoRoutes.js';
import commentRoutes from './Routes/commentRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express(); /* setting a express server */
connectDB(); /* conecting to MongoDB */


/* setting up CORS middleware to allow cross-origin requests from a specific origin */

app.use(cors({
    origin:  'http://localhost:5173', /*react app URL*/
    credentials: true
}))

/* CORS specifies that only request from http://localhost:5173 to be allowed to make request to express back-end.  */


app.use(express.json()); /* middle ware for json script parsing  */

app.use(cookieParser()); /* middleware is used to parse cookies that are sent with the incoming HTTP request. */


app.use('/auth', userRoutes);  /*maps the userRoutes to any request that starts with /auth*/
app.use('/api', videoRoutes); /* maps the videoRoutes to any request that starts with /api */
app.use('/commentApi', commentRoutes);  /* maps the commentRoutes to any request that starts with /commentApi */

app.listen(5100, () => console.log("Server running on http://localhost:5100"));

/* starts the server and makes it listen for incoming HTTP requests on port */