import {
  getLocationsPerEpisode,
  searchNumberChars,
} from "../../utils/challenge";
import {
  characters,
  episodes,
  locationPerEpisodeResponse,
  locations,
} from "../mocks";

describe("Challenge Utils", () => {
  it("Should look up and count a specific character in an array and return the character, quantity, and resource.", () => {
    const location = searchNumberChars(locations, "l", "location");
    const episode = searchNumberChars(episodes, "e", "episode");
    const character = searchNumberChars(characters, "c", "character");
    expect(location).toEqual({ char: "l", count: 1, resource: "location" });
    expect(episode).toEqual({ char: "e", count: 1, resource: "episode" });
    expect(character).toEqual({ char: "c", count: 2, resource: "character" });
  });

  it("Should get locations per episode from two arrays.", () => {
    const locationPerEpisode = getLocationsPerEpisode(characters, episodes);
    expect(locationPerEpisode).toEqual(locationPerEpisodeResponse);
  });
});
