'use strict';
import {
  Model,DataTypes,Sequelize
} from 'sequelize';
import { City } from './city';
export interface IPollution {
  aqius:number;
  mainus:string;
  aqicn:number;
  maincn:string;
  cityId?:number;
  ts:string;
}
export interface PollutionAttributes extends Omit<IPollution, 'id'> {
  id: number;
  cityId: number;
}
export  class Pollution extends Model<PollutionAttributes, IPollution>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public id!: number;
    public aqius!: number;
    public mainus!: string;
    public aqicn!: number;
    public maincn!: string;
    public cityId: number;
    public ts!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models:any) {
      // define association here

      Pollution.belongsTo(models.City, {
        foreignKey: {
          name: 'cityId',
          allowNull: false,
        },
      });
    }
  
    static initModel(sequelize: Sequelize) {
      Pollution.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        aqius: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        mainus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
         aqicn: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        maincn: {
          type: DataTypes.STRING,
          allowNull: false,
        },   
        cityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: City,
            key: 'id'
          }
        }, 
        ts: {
          type: DataTypes.STRING,
          allowNull: false,
        }, 
      }, {
        sequelize:sequelize,
        modelName: 'Pollution',
      });
  }

 
}