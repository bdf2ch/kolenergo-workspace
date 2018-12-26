import { IApplicationMenuItem } from '../interfaces/application-menu-item.interface';
import {ApplicationMenuItemControl} from './application-menu-item-control.model';
import {IApplicationMenuItemControl} from '../interfaces/application-menu-item-control.interface';

/**
 * Класс, реализующий интерфейс элемента меню приложения
 */
export class ApplicationMenuItem implements IApplicationMenuItem {
  id: string;                         // Идентификатор
  title: string;                      // Наименование
  link: string;                       // Ссылка
  icon: string;                       // Иконка
  items: ApplicationMenuItem[];       // Перечень дочених элементов меню
  parent: ApplicationMenuItem;        // Родительский элемент меню
  isSelected: boolean;                // Является ли текущим
  isButtonEnabled: boolean;           //
  action: string;
  buttons: ApplicationMenuItemControl[];    // Массив элементов управлению пункта меню

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationMenuItem) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.link = config ? config.link : null;
    this.icon = config ? config.icon : null;
    this.parent = null;
    this.isSelected = false;
    this.isButtonEnabled = config && config.isButtonEnabled ? config.isButtonEnabled : false;
    this.action = config && config.action ? config.action : null;
    this.buttons = [];
    this.items = [];

    if (config && config.buttons) {
      config.buttons.forEach((item: IApplicationMenuItemControl) => {
        const control = new ApplicationMenuItemControl(item);
        this.buttons.push(control);
      });
    }
  }

  /**
   * Добавление элемента подменю
   * @param item - Элемент меню приложения
   */
  add(item: IApplicationMenuItem): ApplicationMenuItem {
    const subMenuItem = new ApplicationMenuItem(item);
    subMenuItem.parent = this;
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
