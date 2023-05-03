import { ICity } from "../models/city";
import { CityManager } from "./CityManager";
import { PollutionManager } from "./PollutionManager";

export class CronManager {
  cityManager: CityManager;
  pollutionManager: PollutionManager;
  constructor() {
    this.cityManager = new CityManager()
    this.pollutionManager = new PollutionManager();
  }
  async commitParis() {
    try {
      const city: any = await this.cityManager.commitCity({ "latitude": '48.856613', "longitude": '2.352222' } as ICity)
      this.pollutionManager.city = city
    } catch (err) {
      console.error(err);
    }

  }
  async checkParisAirQuality() {
    try {
      let pullotion = await this.pollutionManager.getCityPollution();
      this.pollutionManager.commitCityPollution(pullotion);
    } catch (err) {
      console.error(err);
    }
  }
}