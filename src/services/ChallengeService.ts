import { injectable } from "tsyringe";
import { IChallengeService } from "../interfaces/IChallengeService";
import ChallengeRepository from "../repositories/ChallengeRepository";
import {
  getTime,
  searchNumberChars,
} from "../utils/challenge";

@injectable()
export default class ChallengeService implements IChallengeService {
  challengeRepository: ChallengeRepository;

  constructor(challengeRepository: ChallengeRepository) {
    this.challengeRepository = challengeRepository;
  }

  async getCountsAndLocationsPerEpisode(): Promise<any> {
    const timeStart = process.hrtime();

    const listsPromises = [
      this.getDataFromAPI("character"),
      this.getDataFromAPI("episode"),
      this.getDataFromAPI("location"),
    ];

    const dataFromAPI = await Promise.all(listsPromises);

    const characters = searchNumberChars(dataFromAPI[0], "c", "character");
    const episodes = searchNumberChars(dataFromAPI[1], "e", "episode");
    const locations = searchNumberChars(dataFromAPI[2], "l", "location");

    const charCounterTime = getTime(timeStart);

    return [
      {
        exercise_name: "Char counter",
        time: charCounterTime.executionTime,
        in_time: charCounterTime.in_time,
        results: [locations, episodes, characters],
      }
    ];
  }

  public async getDataFromAPI(resource: string) {
    const endpointData = await this.challengeRepository.getAllData(resource);
    return endpointData;
  }
}
