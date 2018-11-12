import { IApplicationMenuItem } from '../interfaces/application-menu-item.interface';

/**
 * Класс, реализующий интерфейс элемента меню приложения
 */
export class ApplicationMenuItem implements IApplicationMenuItem {
  id: string;                         // Идентификатор
  title: string;                      // Наименование
  link: string;                       // Ссылка
  icon: string;                       // Иконка
  subMenu: ApplicationMenuItem[];     // Перечень дочених элементов меню

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationMenuItem) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.link = config ? config.link : null;
    this.icon = config ? config.icon : null;
    this.subMenu = [];
  }

  /**
   * Добавлени элемента подменю
   * @param item - Элемент меню приложения
   */
  addSubMenu(item: IApplicationMenuItem): ApplicationMenuItem {
    const subMenuItem = new ApplicationMenuItem(item);
    this.subMenu.push(subMenuItem);
    return subMenuItem;
  }

  /**
   * Очистка подменю
   */
  clearSubMenu() {
    this.subMenu = [];
  }
}
