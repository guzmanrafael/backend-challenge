import "dotenv/config";
import express from "express";
import ChallengeRoutes from "./routes/ChallengeRoutes";
import cors from "cors";
import handleError from "./middlewares/handleError";

const app = express();
const apiRoutes = express.Router();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors());

apiRoutes.options("*", cors());

apiRoutes.use("", ChallengeRoutes);

app.use("/api", apiRoutes);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`App excute in port ${process.env.PORT}`);
});
