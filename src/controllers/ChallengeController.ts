import { Response, NextFunction, Request } from "express";
import { autoInjectable } from "tsyringe";
import { IChallengeController } from "../interfaces/IChallengeController";
import ChallengeService from "../services/ChallengeService";

@autoInjectable()
export default class ChallengeController implements IChallengeController {
  challengeService: ChallengeService;

  constructor(challengeService: ChallengeService) {
    this.challengeService = challengeService;
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const result =
        await this.challengeService.getCountsAndLocationsPerEpisode();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
