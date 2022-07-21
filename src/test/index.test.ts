import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);
jest.useFakeTimers();

describe("Test endpoint", () => {
  it("Should return a 200 status.", async () => {
    const response = await request.get("/api/challenge");
    expect(response.status).toBe(200);
  });
});
