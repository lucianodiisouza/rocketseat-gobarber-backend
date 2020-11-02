import express from "express";
import routes from "./routes";
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello GoStack Typescript" });
});

app.listen(3333),
  () => {
    console.log("🚀 launched..");
  };
