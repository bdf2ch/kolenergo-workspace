import { Component, OnInit } from '@angular/core';
import { OperativeSituationService } from '../../services/operative-situation.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.less']
})
export class ApplicationsListComponent implements OnInit {

  constructor(public readonly applications: OperativeSituationService) {}

  ngOnInit() {}

}
