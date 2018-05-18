import { Component, OnInit } from '@angular/core';
import {AhoRequestsService} from '../../shared/services/aho-requests.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.less']
})
export class RequestComponent implements OnInit {

  constructor(public readonly ahoRequestService: AhoRequestsService) {}

  ngOnInit() {
  }

}
