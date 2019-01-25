import {Component, EventEmitter, Host, Input, OnInit, Optional, Output} from '@angular/core';
import { TreeItem } from '../../models/tree-item.model';
import { Tree } from '../../models/tree.model';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.less']
})
export class TreeItemComponent implements OnInit {
  @Input() item: TreeItem<any>;
  @Input() tree: Tree<any>;

  constructor() {}

  ngOnInit() {}

  /**
   * Выбор элемента дерева
   */
  select() {
    if (this.item.isSelected === true) {
      this.tree.deselect(this.item);
    } else {
      this.tree.select(this.item);
    }
  }

  /**
   * Раскрытие / закрытие дочерних элементов
   */
  toggle() {
    if (this.item.isOpened) {
      this.tree.collapse(this.item);
    } else {
      this.tree.expand(this.item);
    }
  }
}
