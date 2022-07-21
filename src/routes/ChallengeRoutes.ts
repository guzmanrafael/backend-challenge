import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import ChallengeController from "../controllers/ChallengeController";

const router = Router();

const challengeController = container.resolve(ChallengeController);

router.get("/challenge", (req: Request, res: Response, next: NextFunction) =>
  challengeController.get(req, res, next)
);

export = router;
