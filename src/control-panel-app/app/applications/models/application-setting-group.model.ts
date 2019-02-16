import { IApplicationSettingGroup } from '../interfaces';

/**
 * Класс, реализующий интерфейс группы настроек приложения
 */
export class ApplicationSettingGroup implements IApplicationSettingGroup {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  description: string;      // Описание
  cols: number;             // Количество колонок, занимаемое группой
  rows: number;             // Количество строк, занимаемое группой
  order: number;            // Порядок следования
  isList: boolean;          // Является ли списком однотипных настроек

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationSettingGroup) {
    this.id = config ? config.id : null;
    this.applicationId = config ? config.applicationId : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
    this.cols = config ? config.cols : 1;
    this.rows = config ? config.rows : 1;
    this.order = config ? config.order : 1;
    this.isList = config ? config.isList : false;
  }
}
