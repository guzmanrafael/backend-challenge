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
