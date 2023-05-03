/* eslint-disable quotes */
import { Options, Sequelize } from 'sequelize';
import {City} from './city';
import {Pollution} from './pollution';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require(`../config/config`);
const config = dbConfig.development;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pg = require('pg');
// Needed to parse big int values
pg.defaults.parseInt8 = true;

class SequelizeServer {
  sequelize: Sequelize;

  constructor(options: Options) {
    this.sequelize = new Sequelize(options);
    this.initModels();
    this.setupRelations();
    this.syncSequelize();
  }

  // Add created models here for initialization 
  private initModels() {
    City.initModel(this.sequelize);
    Pollution.initModel(this.sequelize);
  }

  // Set up data relationships
  private setupRelations() {
    const models  = this.sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });
  }

  // Sync to the database
  private syncSequelize() {
    this.sequelize
      .sync()
      .then(() => console.info('sequelize sync database'))
      .catch((err) => {
        console.error(JSON.stringify(err));
      });
  }
}

const sequelizeServer = new SequelizeServer({ ...config, logging: false });

// export models
export {
  sequelizeServer,
  City,
  Pollution
};
