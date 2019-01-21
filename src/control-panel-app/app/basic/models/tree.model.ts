export class Tree<T> {
  items: T[];
  root: T[];

  constructor(items?: T[]) {
    this.items = [];
    this.root = [];
    if (items) {
      items.forEach((item: T) => {
        this.add(item, item['parentId']);
      });
    }
  }

  /**
   * Поиск элемента дерева по идентификатору
   * @param id - Идентификатор элемента
   */
  getById(id: any): T | null {
    const findItemById = (item: T) => String(item['id']) === String(id);
    const result = this.items.find(findItemById);
    console.log('rez', result);
    return result ? result : null;
  }

  /**
   * Добавление элемента дерева
   * @param item - Добавляемый элемент
   * @param parentId - Идентификатор элемента дерева верхнего уровня
   */
  add(item: T, parentId?: any): T | null {
    this.items.push(item);
    if (parentId) {
      const parent = this.getById(parentId);
      if (parent) {
        console.log('parent found', parent);
        item['parentId'] = parentId;
        parent['children'].push(item);
      }
      return parent ? item : null;
    } else {
      this.root.push(item);
      return item;
    }
  }
}
