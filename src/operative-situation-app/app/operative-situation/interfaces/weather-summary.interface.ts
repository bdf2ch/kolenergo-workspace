import { ILocation } from '../interfaces/location.interface';

/**
 * Интерфейс, описывающий погодную сводку по организации
 */
export interface IWeatherSummary {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  dateCreated: number;      // Дата создания записи
  dateCreated_?: Date;      // Дата создания записи
  locations?: ILocation[];  // Список местоположений
}
