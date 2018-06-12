import { IAhoRequestType } from '../interfaces/aho-request-type.interface';

/**
 * Класс, реализующий интерфейс типа заяки АХО
 */
export class AhoRequestType implements IAhoRequestType {
  id: number;                 // Идентификатор типа
  title: string;              // Наименование типа
  icon: string | null;        // Иконка типа
  order: number;              // Порядок следования
  listTitle: string | null;   // Заголовок сиска задач типа
  itemTitle: string | null;   // Заголовок поля ввлода задачи типа
  isCountable: boolean;       // Измеряются ли задачи типа количественно

  /**
   * Конструктор
   * @param {IAhoRequestType} config - Парметры инициализации
   */
  constructor(config?: IAhoRequestType) {
    this.id = config ? config.id : 0;
    this.title = config ? config.title : '';
    this.icon = config && config.icon ? config.icon : null;
    this.order = config && config.order ? config.order : 0;
    this.listTitle = config ? config.listTitle : null;
    this.itemTitle = config ? config.itemTitle : null;
    this.isCountable = config ? config.isCountable : false;
  }
}