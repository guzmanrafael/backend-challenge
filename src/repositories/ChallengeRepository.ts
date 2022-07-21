import { IChallengeRepository } from "../interfaces/IChallengeRepository";
import axios from "axios";
import { CustomError } from "../models/CustomError";

export default class ChallengeRepository implements IChallengeRepository {
  private url = process.env.URL_API;

  async getAllData(resource: string) {
    try {
      const allIDsList = await this.getAllIDs(resource);

      const { data, status } = await axios.get(
        `${this.url}${resource}/${allIDsList}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      console.error(error);
      throw new CustomError("Problems communicating with the API.", 500, "");
    }
  }

  private async getAllIDs(resource: string) {
    try {
      const { data } = await axios.get(`${this.url}${resource}`);

      const allIDsList = Array.from(
        { length: data.info.count },
        (_, i) => i + 1
      );

      return allIDsList;
    } catch (error) {
      console.error(error);
      throw new CustomError("Problems communicating with the API.", 500, "");
    }
  }
}
