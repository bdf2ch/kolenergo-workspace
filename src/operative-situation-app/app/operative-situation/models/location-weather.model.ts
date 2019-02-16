import { ILocationWeather } from '../interfaces/location-weather.interface';

/**
 * Класс, реализующий интерфейс погодной сводки
 */
export class LocationWeather implements ILocationWeather {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  locationId: number;       // Идентификатор местоположения
  date: string;             // Дата составления сводки
  time: string;             // Время составления сводки
  temperature: number;      // Температура
  humidity: number;         // Влажность
  pressure: number;         // Атмосферное давлени
  wind: number;             // Скорость ветра
  precipitations: string;   // Осадки
  group: string;            // Группа погодных условий
  icon: string;             // Иконка
  dateCreated: number;      // Дата создания записи в формате unixtime
  dateCreated_: Date;       // Дата создания записи

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ILocationWeather) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.locationId = config ? config.locationId : null;
    this.date = config ? config.date : null;
    this.time = config ? config.time : null;
    this.temperature = config ? config.temperature : 0;
    this.humidity = config ? config.humidity : 0;
    this.pressure = config ? config.pressure : 0;
    this.wind = config ? config.wind : 0;
    this.precipitations = config ? config.precipitations : null;
    this.group = config ? config.group : null;
    this.icon = config ? config.icon : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreated_ = config ? new Date(config.dateCreated) : null;
  }
}
