import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

app.listen(process.env.PORT, () => {
  console.log(`App excute in port ${process.env.PORT}`);
});
