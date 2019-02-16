/**
 * Интерфейс, описывающий ответ API https://openweather.org
 */
export interface IWeatherSummaryResponse {
  coord: {
    lon: number,            // Долгота местоположения
    lat: number             // Широта местоположения
  };
  sys: {
    country: string,        // Код страны местоположения
    sunrise: number,        // Время рассвета
    sunset: number          // Время заката
  };
  weather: {
    id: number,             // Идентификатор
    main: string,           // Группа погодных условий
    description: string,    // Описание
    icon: string            // Иконка
  }[];
  main: {
    temp: number,           // Температура
    humidity: number,       // Влажность
    pressure: number,       // Атмосферное давление
    temp_min: number,       // Минимальная температура
    temp_max: number        // Максимальная температура
  };
  wind: {
    speed: number,          // Скорость ветра
    deg: number             // Направление ветра
  };
  rain: {
    '3h': number            // Дождь
  };
  clouds: {
    all: number             // Облачность
  };
  dt: number;               // Время составления погодной сводки
  id: number;               // Идентификатор
  name: string;             // Наименование местоположения
  cod: number;              // Код ответа
}
