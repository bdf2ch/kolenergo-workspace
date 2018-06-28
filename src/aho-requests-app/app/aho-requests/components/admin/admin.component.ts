import { Component, OnInit } from '@angular/core';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { MatTableDataSource } from '@angular/material';
import { IAhoRequestNeed } from '../../interfaces/aho-request-need.interface';

@Component({
  selector: 'app-notifications',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  public dataSource: MatTableDataSource<IAhoRequestNeed>;
  public displayedColumns = ['content', 'total'];
  public now: Date;

  constructor(public readonly ahoRequestsService: AhoRequestsService) {
    this.now = new Date();
  }

  ngOnInit() {
    console.log('admin');
    this.dataSource = new MatTableDataSource<IAhoRequestNeed>(this.ahoRequestsService.getNeeds());
  }

  async exportNeeds() {
    await this.ahoRequestsService.fetchNeedsExport();
  }
}
