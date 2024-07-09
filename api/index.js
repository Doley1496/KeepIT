/* */

/* As we are using type as module therefore we are using import statement instead of require. */

import express from "express";

import cors from "cors";

/* Importing the mongoDB database url and calling it. */
import connectionUrl from "./Config/db.js";
connectionUrl();

/* Importing and configuring the dotenv. */
import dotenv from "dotenv";
dotenv.config();

/* Getting the routes from the Routes folder. */
import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import todolistRoute from "./Routes/todolistRoute.js";

import cookieParser from "cookie-parser";

/* app configuration */
const app = express();

/* Middlewares */

/* Using express() to initialize the cors() function to send request from frontend to backend and we are
   1. passing a origin.
      ie. We will allow the user only from this origin to send request to the server(backend) from the frontend.
          and to allow from all origin instead of an url we can use * .  ie. origin : "*"
   2. passing credentials as true because we need to set the Access-Control-Allow-Credentials in the Response 
      Headers as true to pass(allow) the cookies to the browser.
*/

const corsOptions = {
  /* */

  origin: (origin, callback) => {
    /* */

    const allowedOrigins = [
      "http://localhost:5173",
      "https://keep-it-blue.vercel.app",
    ];

    const isAllowed = allowedOrigins.includes(origin);

    callback(null, isAllowed ? origin : false);

    /* */
  },

  methods: ["GET, POST, PUT, DELETE, PATCH, HEAD"],

  credentials: true,

  /* */
};

app.use(cors(corsOptions));

/* Using express() to initialize the cookieParser() function in-order to get any data from the cookie. */
app.use(cookieParser());

/* Using express() to initialize the json() function in-order to convert codes to json format. */
app.use(express.json());

/*  Creating different Semi-Routes(API endpoints)  */

/*  Using express() to initialize the custom routes:

   After "/api/v1" route the routes created in authRoutes will be added to the
   following route. Similarly for other routes as well.
*/
app.use("/api/auth", authRoute);
app.use("/api/todo", todolistRoute);
app.use("/api/user", userRoute);

/* Sending a response message to the home route */
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to KeepIt App",
  });
});

/* Connnecting port dynamically at 8080. */
const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
  console.log(`Server is running in ${process.env.MODE} at port ${PORT}`);
});

/* Handling the error. */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
