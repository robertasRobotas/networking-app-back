import request from "supertest";
import app from "./app.js";

describe("GET /events", () => {
  it("should return with response", (res) => {
    request(app)
      .get("/events")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, res);
  });
});
