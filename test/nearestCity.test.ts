import request from "supertest";
import app from "../src/app";
import { Pollution, City } from "../src/models";

describe("test get nearest city pollution", () => {
    test('should have key record when get', async () => {
        const response = await request(app).get("/nearestcity/pollution?latitude=48.856613&longitude=2.352222");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Result');
        expect(response.body.Result).toHaveProperty('Pollution');
        expect(response.body.Result.Pollution).toHaveProperty('ts');
        expect(response.body.Result.Pollution).toHaveProperty('aqius');
        expect(response.body.Result.Pollution).toHaveProperty('mainus');
        expect(response.body.Result.Pollution).toHaveProperty('aqicn');
        expect(response.body.Result.Pollution).toHaveProperty('maincn');
    });
    test('test without params', async () => {
        const response = await request(app).get(`/nearestcity/pollution?`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('Result');
    });
});

describe("test integration with db", () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Reset all mock implementations before each test
    });
    test('should retrieve the pollution data for the specified city and date', async () => {
        let createdAt = new Date().toISOString()
        let pollutionData = {
            cityId: 1,
            ts: "2023-04-28T16:00:00.000Z",
            aqius: 29,
            mainus: "o3",
            aqicn: 22,
            maincn: "o3"
        }
        const createdMock = jest.spyOn(Pollution, 'create').mockResolvedValue({
            ...pollutionData
        } as Pollution);
        const response = await request(app).get(`/maximumpolluted`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("datetime");
        expect(response.body.datetime).toBe(createdAt);
        expect(createdMock).toHaveBeenCalledTimes(1);

    });
    test('test no pollution in db', async () => {
        const findOneMock = jest.spyOn(Pollution, 'findOne').mockResolvedValue(null);
        const response = await request(app).get(`/maximumpolluted`);
        expect(response.status).toBe(404);
        expect(findOneMock).toHaveBeenCalledTimes(1);

    });

});
