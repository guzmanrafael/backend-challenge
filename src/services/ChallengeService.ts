import { injectable } from "tsyringe";
import { IChallengeService } from "../interfaces/IChallengeService";
import ChallengeRepository from "../repositories/ChallengeRepository";
import {
  getLocationsPerEpisode,
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

    const locationsPerEpisode = getLocationsPerEpisode(
      dataFromAPI[0],
      dataFromAPI[1]
    );
    const locationsPerEpisodeTime = getTime(timeStart);

    return [
      {
        exercise_name: "Char counter",
        time: charCounterTime.executionTime,
        in_time: charCounterTime.in_time,
        results: [locations, episodes, characters],
      },
      {
        exercise_name: "Episode locations",
        time: locationsPerEpisodeTime.executionTime,
        in_time: locationsPerEpisodeTime.in_time,
        results: locationsPerEpisode,
      },
    ];
  }

  public async getDataFromAPI(resource: string) {
    const endpointData = await this.challengeRepository.getAllData(resource);
    return endpointData;
  }
}
