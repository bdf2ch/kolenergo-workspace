import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.less']
})
export class TreeItemComponent implements OnInit {
  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

}
