import { ApplicationMenuItem } from './application-menu-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Класс, реализующий управлению меню приложения
 */
export class ApplicationMenuManager {
  public items: BehaviorSubject<ApplicationMenuItem[]>;
  private menuBehaviorSubject: BehaviorSubject<ApplicationMenuItem[]>;
  private activeMenuItem: BehaviorSubject<ApplicationMenuItem>;

  constructor(config?: ApplicationMenuItem[]) {
    this.items = new BehaviorSubject<ApplicationMenuItem[]>([]);
    this.menuBehaviorSubject = new BehaviorSubject<ApplicationMenuItem[]>( config ? config : []);
    this.activeMenuItem = new BehaviorSubject<ApplicationMenuItem>(null);
  }

  /**
   * добавление элемента меню
   * @param item - Элемент меню приложения
   */
  addItem(item: ApplicationMenuItem): ApplicationMenuItem {
    this.items.next(this.items.getValue().concat([item]));
    this.menuBehaviorSubject.next(this.menuBehaviorSubject.getValue().concat(item));
    return item;
  }

  /**
   * Установка активного элемента меню
   * @param link - URL элемента меню
   */
  setActiveItem(link: string): ApplicationMenuItem | null {
    console.log(this.items);
    this.items.getValue().forEach((item: ApplicationMenuItem) => {
      let result = null;
      let parent = null;
      if (item.link === link) {
        item.isSelected = true;
        if (item.parent) {
          parent = item.parent;
          parent.isSelected = true;
        }
        this.activeMenuItem.next(item);
        result = item;
      } else if (parent && item.id !== parent.id) {
        item.isSelected = false;
      }
      return result;
    });
    /*
    this.menuBehaviorSubject.getValue().forEach((item: ApplicationMenuItem) => {
      if (item.link === link) {
        this.activeMenuItem.next(item);
        return item;
      }
    });
    */
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
