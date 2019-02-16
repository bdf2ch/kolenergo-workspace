import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Tree } from '../../models/tree.model';
import { TreeItem } from '../../models/tree-item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit, OnDestroy {
  @Input() public tree: Tree<any>;
  @Output() select: EventEmitter<TreeItem<any>> = new EventEmitter();
  private selectedItemSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.selectedItemSubscription = this.tree.selected.asObservable()
      .subscribe((item: TreeItem<any> | null) => {
        this.select.emit(item);
      });
    console.log(this.selectedItemSubscription);
  }

  ngOnDestroy() {
    // this.selectedItemSubscription.unsubscribe();
  }

  selectItem(event: any) {
    this.tree.select(event);
  }

  deselectItem(event: any) {
    this.tree.deselect(event);
  }

}
