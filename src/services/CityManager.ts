
import {ICity} from '../models/city';
import {City} from '../models'
export class CityManager{


    async commitCity(city:ICity){
        try{
          return await City.create({...city});
        }
        catch(err){
            console.log(err);
        }

    }

};