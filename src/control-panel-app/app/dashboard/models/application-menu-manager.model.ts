import { ApplicationMenuItem } from './application-menu-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Класс, реализующий управлению меню приложения
 */
export class ApplicationMenuManager {
  public items$: BehaviorSubject<ApplicationMenuItem[]>;
  private root$: BehaviorSubject<ApplicationMenuItem[]>;
  private activeMenuItem: BehaviorSubject<ApplicationMenuItem>;

  constructor(config?: ApplicationMenuItem[]) {
    this.items$ = new BehaviorSubject<ApplicationMenuItem[]>([]);
    this.root$ = new BehaviorSubject<ApplicationMenuItem[]>( config ? config : []);
    this.activeMenuItem = new BehaviorSubject<ApplicationMenuItem>(null);
  }

  /**
   * Добавление элемента меню
   * @param item - Элемент меню приложения
   */
  addItem(item: ApplicationMenuItem, parent?: ApplicationMenuItem): ApplicationMenuItem {
    item.parent = parent ? parent : null;
    this.items$.next(this.items$.getValue().concat([item]));
    if (parent) {
      parent.add(item);
      this.root$.next(this.root$.getValue());
    } else {
      this.root$.next(this.root$.getValue().concat(item));
    }
    return item;
  }

  editItem(item: ApplicationMenuItem): boolean {
    const menuItem = this.getItemById(item.id);
    if (menuItem) {
      menuItem.title = item.title;
      menuItem.link = item.link;
      menuItem.icon = item.icon;
      this.items$.next(this.items$.getValue());
      if (menuItem.parent) {
        const thisItem = menuItem.parent.getById(menuItem.id);
        thisItem.title = item.title;
        thisItem.link = item.link;
        thisItem.icon = item.icon;
      } else {
        const rootItems = this.root$.getValue();
        rootItems.forEach((rootItem: ApplicationMenuItem) => {
          if (rootItem.id === menuItem.id) {
            rootItem.title = item.title;
            rootItem.link = item.link;
            rootItem.icon = item.icon;
          }
        });
        this.root$.next(rootItems);
      }
      return true;
    }
    return false;
  }

  /**
   * Удаление элемента меню
   * @param item - Удаляемый элемент меню
   */
  deleteItem(item: ApplicationMenuItem): boolean {
    const appMenuItem = this.getItemById(item.id);
    if (appMenuItem) {
      if (appMenuItem.parent) {
        appMenuItem.parent.delete(item);
      } else {
        const root = this.root$.getValue();
        root.forEach((rootItem: ApplicationMenuItem, index: number) => {
          if (rootItem.id === appMenuItem.id) {
            root.splice(index, 1);
          }
        });
        this.root$.next(root);
      }
      const items = this.items$.getValue();
      items.forEach((menuItem: ApplicationMenuItem, index: number) => {
        if (menuItem.id === item.id) {
          items.splice(index, 1);
        }
      });
      this.items$.next(items);
      return true;
    }
    return false;
  }

  /**
   * Установка активного элемента меню
   * @param link - URL элемента меню
   */
  setActiveItem(link: string): ApplicationMenuItem | null {
    console.log('LINK', link);
    console.log('ITEMS', this.items$.getValue());
    this.items$.getValue().forEach((item: ApplicationMenuItem) => {
      if (item.link === link) {
        console.log('MENU ITEM FOUND', item, link);
        item.isSelected = true;
        this.activeMenuItem.next(item);
        if (item.parent) {
          item.parent.isSelected = true;
        }
        return item;
      }
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
    return this.root$.asObservable();
  }

  /**
   * Поиск элемента меню по идентификатору
   * @param id - Идентфиикатор элемента меню
   */
  getItemById(id: string): ApplicationMenuItem | null {
    const findMenuItemById = (item: ApplicationMenuItem) => item.id === id;
    const foundedItem = this.items$.getValue().find(findMenuItemById);
    return foundedItem ? foundedItem : null;
  }

  /**
   * Поиск элемента меню по URL
   * @param url - URL элемента меню
   */
  getItemByUrl(url: string): ApplicationMenuItem | null {
    const findMenuItemByUrl = (item: ApplicationMenuItem) => item.link === url;
    const foundedItem = this.items$.getValue().find(findMenuItemByUrl);
    return foundedItem ? foundedItem : null;
  }
  /**
   * Возвращает активный элеменит меню приложения
   */
  getActiveItem(): Observable<ApplicationMenuItem> {
    return this.activeMenuItem.asObservable();
  }
}
