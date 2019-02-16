/**
 * Интерфейс, описывающий погодную сводку
 */
export interface ILocationWeather {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  locationId: number;       // Идентификатор местоположения
  date: string;             // Дата составления сводки
  time: string;             // Время составления сводки
  temperature: number;      // Минимальная температура
  humidity: number;         // Влажность
  pressure: number;         // Атмосферное давление
  wind: number;             // Скорость ветра
  precipitations: string;   // Осадки
  group: string;            // Группа погодных условий
  icon: string;             // Иконка
  dateCreated: number;      // Дата создания записи
}
