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
