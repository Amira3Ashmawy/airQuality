import {Request, Response, Router } from 'express';

import { IPollution } from '../models/pollution';
import { PollutionManager,Coordinates } from '../services/PollutionManager';

export class AirQualityController{
  router:Router;
  pollutionManager:PollutionManager;
  
  constructor(router:Router){
    this.router = router;
    this.pollutionManager = new PollutionManager()

  }
  setUpEndpoints(){

    this.router.get('/nearestcity/pollution',async (req:Request,res:Response)=>{
        try {
            const coordinates:Coordinates = req.query;
            const pollution:IPollution = await this.pollutionManager.getCityPollution(coordinates);
            let result= {
              "Result": {
                "Pollution":pollution
              }
            }
            res.send(result)
        } catch (error) {
            res.send().status(400);
        }
    });
    this.router.get('/maximumpolluted', async(req:Request,res:Response)=>{
      try{
        let maxPollutted =  await this.pollutionManager.getMaxPolluted();
        if(maxPollutted!== null){
          res.send({"datetime" :maxPollutted.createdAt});
        }
        res.status(404).json({ error: 'There is no Pollution data' });;
      }catch(error){
        res.status(400);
      }

    })

}
}
