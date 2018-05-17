import { IAhoRequestStatus } from '../interfaces/aho-request-status.interface';

/**
 * Класс, реализующий интерфейс статуса заявки АХО
 */
export class AhoRequestStatus implements  IAhoRequestStatus {
  id: number;                 // Идентифиактор статуса заявки
  title: string;              // Наименование статуса
  icon: string | null;        // Иконка статуса
  iconColor: string | null;   // Цвет иконки статуса

  /**
   * Конструктор
   * @param {IAhoRequestStatus} config - Параметры инициализации
   */
  constructor(config?: IAhoRequestStatus) {
    this.id = config ? config.id : 0;
    this.title = config ? config.title : '';
    this.icon = config && config.icon ? config.icon : null;
    this.iconColor = config && config.iconColor ? config.iconColor : null;
  }
}
