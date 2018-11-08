import { IApplication } from '../interfaces/application.interface';

/**
 * Класс, реализующий интерфейс приложения
 */
export class Application implements IApplication {
  id: number;           // Идентификатор приложения
  code: string;         // Код приложения
  title: string;        // Наименование приложения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplication) {
    this.id = config ? config.id : null;
    this.code = config ? config.code : null;
    this.title = config ? config.title : null;
  }
}
