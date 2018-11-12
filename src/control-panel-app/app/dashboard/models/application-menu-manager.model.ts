import { ApplicationMenuItem } from './application-menu-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Класс, реализующий управлению меню приложения
 */
export class ApplicationMenuManager {
  private menu: BehaviorSubject<ApplicationMenuItem[]>;
  private activeMenuItem: BehaviorSubject<ApplicationMenuItem>;

  constructor(config?: ApplicationMenuItem[]) {
    this.menu = new BehaviorSubject<ApplicationMenuItem[]>(config ? config : []);
    this.activeMenuItem = new BehaviorSubject<ApplicationMenuItem>(null);
  }

  /**
   * добавление элемента меню
   * @param item - Элемент меню приложения
   */
  addMenuItem(item: ApplicationMenuItem): ApplicationMenuItem {
    this.menu.value.push(item);
    return item;
  }

  /**
   * Установка активного элемента меню
   * @param link - URL элемента меню
   */
  setActiveMenuItem(link: string): ApplicationMenuItem | null {
    this.menu.value.forEach((item: ApplicationMenuItem) => {
      if (item.link === link) {
        this.activeMenuItem.next(item);
        return item;
      }
    });
    return null;
  }

  /**
   * Возвращает элементы меню приложения
   */
  getMenuItems(): Observable<ApplicationMenuItem[]> {
    return this.menu.asObservable();
  }

  /**
   * Поиск элемента меню по идентификатору
   * @param id - Идентфиикатор элемента меню
   */
  getMenuItemById(id: string): ApplicationMenuItem | null {
    const findMenuItemById = (item: ApplicationMenuItem) => item.id === id;
    const foundedItem = this.menu.value.find(findMenuItemById);
    return foundedItem ? foundedItem : null;
  }

  /**
   * Возвращает активный элеменит меню приложения
   */
  getActiveMenuItem(): Observable<ApplicationMenuItem> {
    return this.activeMenuItem.asObservable();
  }
}
