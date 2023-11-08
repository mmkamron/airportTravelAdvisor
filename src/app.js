import "dotenv/config.js";
import cookieParser from "cookie-parser";
import express from "express";
import * as auth from "./controller/authController.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/api/v1/register", auth.register);
app.post("/api/v1/login", auth.login);
app.get("/api/v1/refresh", auth.refresh);
app.get("/api/v1/logout", auth.logout);
//
app.listen(8080, () => {
  console.log("Server is listening...");
});
