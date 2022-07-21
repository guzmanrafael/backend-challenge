import { Character } from "../models/Character";
import { Episode } from "../models/Episode";
import { Location } from "../models/Location";

export function searchNumberChars(
  array: Episode[] | Location[] | Character[],
  char: string,
  resource: string
) {
  let count: number = 0;
  array.forEach((element: Episode | Location | Character) => {
    const reg = new RegExp(char, "gi");
    count = count + (element.name.match(reg) || []).length;
  });

  return { char, count, resource };
}

export function getTime(timeStart: [number, number]) {
  const [seconds, nanoseconds] = process.hrtime(timeStart);
  const executionTime = `${seconds}s ${Math.floor(nanoseconds / 1000000)}ms`;

  return {
    executionTime,
    in_time: seconds < 3 ? true : false,
  };
}

export function getLocationsPerEpisode(
  characters: Character[],
  episodes: Episode[]
) {
  const locationsByCharacterId = characters.reduce((acc, character) => {
    acc[character.id] = character.origin.name;
    return acc;
  }, {});

  const episodeLocations = episodes.map((episode) => {
    const { characters } = episode;
    const lastIndex = characters[0].lastIndexOf("/") + 1;

    const character = characters.map((url) => url.substring(lastIndex));

    const locations = character.reduce((locationList, id) => {
      if (!locationList.includes(locationsByCharacterId[id]))
        locationList.push(locationsByCharacterId[id]);

      return locationList;
    }, []);

    return {
      name: episode.name,
      episode: episode.episode,
      locations,
      locationsQuantity: locations.length,
      charactersQuantity: characters.length,
    };
  });

  return episodeLocations;
}
