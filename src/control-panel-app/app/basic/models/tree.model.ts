import { TreeItem } from './tree-item.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Tree<T> {
  items: TreeItem<T>[];
  root: TreeItem<T>[];
  selected: BehaviorSubject<TreeItem<T>>;
  itemIdField: string;
  itemParentIdField: string;
  itemTitleField: string;

  /**
   * Конструктр
   * @param items - Элементы дерева
   * @param idField - Поле идентификатора элемента
   * @param parentIdField - Полк идентификатора элемента верхнего уровня
   * @param titleField - Поле наименования элемента
   */
  constructor(items: T[], idField: string, parentIdField: string, titleField: string) {
    this.items = [];
    this.root = [];
    this.selected = new BehaviorSubject<TreeItem<T>>(null);
    this.itemIdField = idField;
    this.itemParentIdField = parentIdField;
    this.itemTitleField = titleField;
    if (items) {
      items.forEach((item: T) => {
        const treeItem = new TreeItem(item, idField, parentIdField, titleField);
        this.addItem(treeItem);
      });
    }
  }

  /**
   * Добавление элемента дерева
   * @param item - Добавляемый элемент
   */
  private addItem(item: TreeItem<T>): TreeItem<T> | null {
    this.items.push(item);
    if (item.parentId) {
      const parent = this.getById(item.parentId);
      if (parent) {
        parent.children.push(item);
      }
      return parent ? item : null;
    } else {
      this.root.push(item);
      return item;
    }
  }

  /**
   * Поиск элемента дерева по идентификатору
   * @param id - Идентификатор элемента
   */
  getById(id: any): TreeItem<T> | null {
    const findItemById = (item: TreeItem<T>) => item['id'] === id;
    const result = this.items.find(findItemById);
    return result ? result : null;
  }

  /**
   * Добавление элемента дерева
   * @param item - Добавляемый элемент
   */
  add(item: T): TreeItem<T> | null {
    const treeItem = new TreeItem(item, this.itemIdField, this.itemParentIdField, this.itemTitleField);
    return this.addItem(treeItem);
  }

  /**
   * Удаление элемента дерева
   * @param item - Удаляемый элемент
   */
  delete(item: TreeItem<T>): boolean {
    const item_ = this.getById(item.id);
    if (item_) {
      console.log('deleting item', item_);
      if (item_.parentId === 0) {
        console.log('no parent');
        this.root.forEach((rootItem: TreeItem<T>, index: number) => {
          if (rootItem.id === item_.id) {
            this.root.splice(index, 1);
          }
        });
      } else {
        const parent = this.getById(item.parentId);
        parent.children.forEach((child: TreeItem<T>, index: number) => {
          if (child.id === item_.id) {
            parent.children.splice(index, 1);
          }
        });
        this.items.forEach((treeItem: TreeItem<T>, index: number) => {
          if (treeItem.id === item_.id) {
            this.items.splice(index, 1);
          }
        });
      }
      return true;
    }
    return false;
  }

  /**
   * Выбор элемента дерева
   * @param item - Выбираемый элемент
   */
  select(item: TreeItem<T>): boolean {
    const item_ = this.getById(item.id);
    if (item_) {
      this.items.forEach((i: TreeItem<T>) => {
        if (i.id === item.id) {
          i.isSelected = true;
          i.isOpened = !i.isOpened ? true : true;
          this.selected.next(i);
        } else {
          i.isSelected = false;
        }
      });
      return true;
    }
    return false;
  }

  /**
   * Отмена выбора элемента дерева
   * @param item - Элемент, для которого следует сделать отмену выбора
   */
  deselect(item: TreeItem<T>): boolean {
    const item_ = this.getById(item.id);
    if (item_) {
      item.isSelected = false;
      this.selected.next(null);
      return true;
    }
    return false;
  }

  /**
   * Распахивание элемента дерева
   * @param item - Распахиваемый элемент
   */
  expand(item: TreeItem<T>): boolean {
    const item_ = this.getById(item.id);
    if (item_) {
      item_.isOpened = true;
      return true;
    }
    return false;
  }

  /**
   * Сворачивание элемента дерева
   * @param item - Сворачиваемый элемент
   */
  collapse(item: TreeItem<T>): boolean {
    const item_ = this.getById(item.id);
    if (item_) {
      item_.isOpened = false;
      return true;
    }
    return false;
  }
}
