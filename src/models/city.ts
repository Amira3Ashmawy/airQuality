'use strict';
import {
  Model, DataTypes, Sequelize
} from 'sequelize';

export interface ICity {
  name: string;
  longitude: string;
  latitude: string;
}
export interface CityAttributes extends Omit<ICity, 'id'> {
  id: number;
}
export class City extends Model<CityAttributes, ICity>{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  name: string;
  longitude!: string;
  latitude!: string;
  static associate(models: any) {
    // define association here
  }
  static initModel(sequelize: Sequelize) {
    City.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize: sequelize,
      modelName: 'City',
    });
  }
}
