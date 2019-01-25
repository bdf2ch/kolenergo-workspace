export class TreeItem<T> {
  item: T;
  id: any;
  parentId: any;
  title: string;
  isSelected: boolean;
  isOpened: boolean;
  children: TreeItem<T>[];

  constructor(item: T, idField: string, parentIdField: string, titleField: string) {
    this.item = item;
    this.id = item[idField] ? item[idField] : null;
    this.parentId = item[parentIdField] ? item[parentIdField] : 0;
    this.title = item[titleField] ? item[titleField] : null;
    this.isSelected = false;
    this.isOpened = false;
    this.children = [];
  }
}
