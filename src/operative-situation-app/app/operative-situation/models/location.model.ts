import { ILocation } from '../interfaces/location.interface';
import { LocationWeather } from './location-weather.model';
import { ILocationWeather } from '@kolenergo/osr';

/**
 * Класс, реализующий интерфейс местоположения
 */
export class Location implements ILocation {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  coordinates: {
    x: number,                  // Широта
    y: number                   // Долгота
  };
  weather?: ILocationWeather;   // Погодная сводка

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ILocation) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
    this.coordinates = {
      x: config ? config.coordinates.x : null,
      y: config ? config.coordinates.y : null
    };
    this.weather = config ? new LocationWeather(config.weather) : null;
  }
}
