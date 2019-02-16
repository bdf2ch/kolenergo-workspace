import {Component, HostListener, OnInit} from '@angular/core';
import {ApplicationsService} from '@kolenergo/cpa';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  styles: [':host { display: flex; width: 100%; height: 100%; flex: 1;}']
})
export class SettingsComponent implements OnInit {

  constructor(public readonly applications: ApplicationsService) { }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
  }

}
