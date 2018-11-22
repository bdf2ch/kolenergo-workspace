import { IApplicationMenuItem } from '../interfaces/application-menu-item.interface';

/**
 * Класс, реализующий интерфейс элемента меню приложения
 */
export class ApplicationMenuItem implements IApplicationMenuItem {
  id: string;                         // Идентификатор
  title: string;                      // Наименование
  link: string;                       // Ссылка
  icon: string;                       // Иконка
  items: ApplicationMenuItem[];       // Перечень дочених элементов меню

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationMenuItem) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.link = config ? config.link : null;
    this.icon = config ? config.icon : null;
    this.items = [];
  }

  /**
   * Добавление элемента подменю
   * @param item - Элемент меню приложения
   */
  add(item: IApplicationMenuItem): ApplicationMenuItem {
    const subMenuItem = new ApplicationMenuItem(item);
    this.items.push(subMenuItem);
    return subMenuItem;
  }

  /**
   * поиск элемента подменю по идентификатору
   * @param id - Идентификатор элемента подменю
   */
  getById(id: string): ApplicationMenuItem | null {
    const findMenuItemById = (item: ApplicationMenuItem) => item.id === id;
    const searchResult = this.items.find(findMenuItemById);
    return searchResult ? searchResult : null;
  }
}
