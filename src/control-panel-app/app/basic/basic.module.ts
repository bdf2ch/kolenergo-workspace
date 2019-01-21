import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { TreeComponent } from './components/tree/tree.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    TreeComponent,
    TreeItemComponent
  ],
  exports: [
    TreeItemComponent,
    TreeComponent
  ]
})
export class BasicModule { }
