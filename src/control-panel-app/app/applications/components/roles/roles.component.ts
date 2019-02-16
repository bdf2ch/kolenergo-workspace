import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '@kolenergo/cpa';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
  styles: [':host { display: flex; width: 100%; height: 100%;}']
})
export class RolesComponent implements OnInit {
  public rolesDisplayColumns: string[];

  constructor(public readonly applications: ApplicationsService) {
    this.rolesDisplayColumns = ['title', 'controls'];
  }

  ngOnInit() {
  }

}
