import express, { Request, Response,Router } from 'express';
import {AirQualityController} from './controllers/airQualityController'
import { CronManager } from './services/cronJob';
import {sequelizeServer} from './models';
const cron = require('node-cron');
export const sequelize = sequelizeServer.sequelize;

const app = express();
/** Routes */
const router:Router = express.Router();
const airQualityRoutes = new AirQualityController(router);
airQualityRoutes.setUpEndpoints();
app.use(express.json());
 app.use('/', router);

app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
  });



  app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
const cronManager = new CronManager()
cronManager.commitParis()
cron.schedule('* * * * *', () => {
  cronManager.checkParisAirQuality();
});

export default app;