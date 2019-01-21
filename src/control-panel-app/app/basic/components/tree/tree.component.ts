import { Component, Input, OnInit } from '@angular/core';
import { Tree } from '../../models/tree.model';

@Component({
  selector: 'tree-view',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {
  @Input() public tree: Tree<any>;

  constructor() { }

  ngOnInit() {}

}
