import { ApplicationMenuItem } from './application-menu-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Класс, реализующий управлению меню приложения
 */
export class ApplicationMenuManager {
  private menuBehaviorSubject: BehaviorSubject<ApplicationMenuItem[]>;
  private activeMenuItem: BehaviorSubject<ApplicationMenuItem>;

  constructor(config?: ApplicationMenuItem[]) {
    this.menuBehaviorSubject = new BehaviorSubject<ApplicationMenuItem[]>( config ? config : []);
    this.activeMenuItem = new BehaviorSubject<ApplicationMenuItem>(null);
  }

  /**
   * добавление элемента меню
   * @param item - Элемент меню приложения
   */
  addItem(item: ApplicationMenuItem): ApplicationMenuItem {
    this.menuBehaviorSubject.next(this.menuBehaviorSubject.getValue().concat(item));
    return item;
  }

  /**
   * Установка активного элемента меню
   * @param link - URL элемента меню
   */
  setActiveItem(link: string): ApplicationMenuItem | null {
    this.menuBehaviorSubject.value.forEach((item: ApplicationMenuItem) => {
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
  getItems(): Observable<ApplicationMenuItem[]> {
    return this.menuBehaviorSubject.asObservable();
  }

  /**
   * Поиск элемента меню по идентификатору
   * @param id - Идентфиикатор элемента меню
   */
  getItemById(id: string): ApplicationMenuItem | null {
    const findMenuItemById = (item: ApplicationMenuItem) => item.id === id;
    const foundedItem = this.menuBehaviorSubject.getValue().find(findMenuItemById);
    return foundedItem ? foundedItem : null;
  }

  /**
   * Поиск элемента меню по URL
   * @param url - URL элемента меню
   */
  getItemByUrl(url: string): ApplicationMenuItem | null {
    const findMenuItemByUrl = (item: ApplicationMenuItem) => item.link === url;
    const foundedItem = this.menuBehaviorSubject.getValue().find(findMenuItemByUrl);
    return foundedItem ? foundedItem : null;
  }
  /**
   * Возвращает активный элеменит меню приложения
   */
  getActiveItem(): Observable<ApplicationMenuItem> {
    return this.activeMenuItem.asObservable();
  }
}
