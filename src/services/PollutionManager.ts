import axios from 'axios';

import { Pollution } from '../models';
import { IPollution } from '../models/pollution';
import { City } from '../models/city';
import { Op } from 'sequelize';


const models = require('../models')

export interface Coordinates {
    latitude?: string,
    longitude?: string
}

export class PollutionManager {
    city: City
    constructor(city?: City) {
        if (city !== undefined)
            this.city = city;
        else
            this.city = new City();
    };
    async commitCityPollution(pollutionData: IPollution) {
        try {
            await Pollution.create({ ...pollutionData, cityId: this.city.id });
        } catch (err) {
            console.error(err);
        }
    }
    async getCityPollution(coordinates?: Coordinates): Promise<IPollution> {
        try {
            if (coordinates === undefined && this.city !== undefined) {
                coordinates = { latitude: this.city.latitude, longitude: this.city.longitude };
            }
            const response = await axios.get(
                `${process.env.AIR_VISUAL}/nearest_city?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&key=${process.env.AIRVISUAL_API_KEY}`);

            const pollutionResult: any = response.data.data?.current?.pollution;
            return pollutionResult;
        } catch (error) {
            console.error(error);
        }
    }
    async getMaxPolluted() {
        try {
            const maxPollutted = await Pollution.findOne({
                where: {
                    aqius: { // I am assuming that this determinse the best pollution  
                        [Op.eq]: Pollution.sequelize.literal(`(SELECT MAX(aqius) FROM "Pollution")`)
                    }
                }
            }) as Pollution;
            return maxPollutted
        }
        catch (err) {
            console.error(err)
        }
    }
}