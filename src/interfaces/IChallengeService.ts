export interface IChallengeService {
  getCountsAndLocationsPerEpisode(): Promise<any>;
  getDataFromAPI(resource: string);
}
