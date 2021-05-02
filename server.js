import express from 'express';
import "./db/mongooseConnect.js";

import message from "./routes/message.js";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded());
//routes
app.use("/message", message);
app.listen(8080, ()=> console.log("Listening on port 8080"));