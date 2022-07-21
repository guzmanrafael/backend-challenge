import "reflect-metadata";
import ChallengeRepository from "../../repositories/ChallengeRepository";
import ChallengeService from "../../services/ChallengeService";
import { characters, episodes, locations, resultsCharCounter, resultsEpisodeLocations } from "../mocks";

describe("Challenge Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should get all the character data", async () => {
    const challengeRepository: jest.Mocked<ChallengeRepository> = {
      getAllData: jest
        .fn()
        .mockImplementation(() => Promise.resolve(characters)),
      getAllIDs: jest.fn(),
    };

    const challengeService = new ChallengeService(challengeRepository);
    const expected = await challengeService.getDataFromAPI("character");
    expect(expected).toMatchObject(characters);
  });

  it("Should get all the episode data", async () => {
    const challengeRepository: jest.Mocked<ChallengeRepository> = {
      getAllData: jest
        .fn()
        .mockImplementation(() => Promise.resolve(episodes)),
      getAllIDs: jest.fn(),
    };

    const challengeService = new ChallengeService(challengeRepository);
    const expected = await challengeService.getDataFromAPI("episode");
    expect(expected).toMatchObject(episodes);
  });

  it("Should get all the location data", async () => {
    const challengeRepository: jest.Mocked<ChallengeRepository> = {
      getAllData: jest
        .fn()
        .mockImplementation(() => Promise.resolve(locations)),
      getAllIDs: jest.fn(),
    };

    const challengeService = new ChallengeService(challengeRepository);
    const expected = await challengeService.getDataFromAPI("location");
    expect(expected).toMatchObject(locations);
  });

  it("Should get counts and locations per episode.", async () => {
    const challengeRepository = new ChallengeRepository();
    const challengeService = new ChallengeService(challengeRepository);

    jest.spyOn(challengeService, 'getDataFromAPI').mockImplementation((resource: string) => {
      if(resource === 'character') {
        return Promise.resolve(characters);
      } else if (resource === 'episode') {
        return Promise.resolve(episodes);
      } else if (resource === 'location') {
        return Promise.resolve(locations);
      }
    });

    const expected = await challengeService.getCountsAndLocationsPerEpisode();
    expect(expected[0].exercise_name).toEqual('Char counter');
    expect(expected[1].exercise_name).toEqual('Episode locations');

    expect(expected[0].results).toMatchObject(resultsCharCounter);
    expect(expected[1].results).toMatchObject(resultsEpisodeLocations);
  });
});
