import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../../services/applications.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.less']
})
export class ApplicationsListComponent implements OnInit {

  constructor(public readonly applications: ApplicationsService) {}

  ngOnInit() {}

}
