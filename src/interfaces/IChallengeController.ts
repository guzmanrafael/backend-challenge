import { Request, Response, NextFunction } from "express";

export interface IChallengeController {
  get(req: Request, res: Response, next: NextFunction): Promise<any>;
}
