import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
