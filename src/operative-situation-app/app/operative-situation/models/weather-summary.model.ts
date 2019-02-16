import { ILocation, IWeatherSummary } from '@kolenergo/osr';
import { Location } from './location.model';

export class WeatherSummary implements IWeatherSummary {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  dateCreated: number;      // Дата создания в формате unixtime
  dateCreated_: Date;       // Дата создания
  locations: ILocation[];   // Список местоположений

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IWeatherSummary) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreated_ = config ? new Date(config.dateCreated) : null;
    this.locations = [];

    if (config) {
      config.locations.forEach((item: ILocation) => {
        const location = new Location(item);
        this.locations.push(location);
      });
    }
  }
}
