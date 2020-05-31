import express from "express";
import { json, urlencoded } from "body-parser";
import database from "./utils/db";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

database().catch(err => handleError(err));

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
