/**
 * Интерфейс, описывающий погодную сводку
 */
export interface IOperativeSituationWeatherReport {
  id: number;                 // Идентификатор
  companyId: number;          // Идентификатор организации
  regionId: number;           // Идентификатор региона
  date: string;               // Дата сводки
  time: string;               // Время сводки
  temperatureMin: number;     // Минимальная температура
  temperatureMax: number;     // Максимальная температура
  wind: number;               // Скорость ветра
  precipitations: string;     // Осадки
  dateCreated: number;        // Дата внесения записи
}
