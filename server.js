import express from 'express';
import "./db/mongooseConnect.js";

import api from "./routes/api.js";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded());
//routes
app.use("/api", api);
app.listen(process.env.PORT || 8080, ()=> console.log("Listening on port 8080"));