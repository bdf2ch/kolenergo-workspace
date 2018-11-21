import { Injectable } from '@angular/core';
import { ApplicationMenuManager } from '../models/application-menu-manager.model';
import { ApplicationMenuItem } from '../models/application-menu-item.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DashboardResource } from '../resources/dashboard.resource';
import { IServerResponse } from '@kolenergo/lib';
import { IControlPanelInitData } from '../interfaces/control-panel-init-data.interface';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { IApplication } from '../../applications/interfaces/application.interface';
import { Application } from '../../applications/models/application.model';
import { ApplicationsService } from '../../applications/services/applications.service';

@Injectable()
export class DashboardService {
  public readonly menu: ApplicationMenuManager;

  constructor(private readonly resource: DashboardResource,
              private readonly router: Router,
              // private readonly applications: ApplicationsService
  ) {
    this.menu = new ApplicationMenuManager();
    this.menu.addItem(
      new ApplicationMenuItem({
        id: 'dashboard',
        title: 'Главная',
        link: '/dashboard',
        icon: 'dashboard'
      })
    );
    this.menu.addItem(
      new ApplicationMenuItem({
        id: 'applications',
        title: 'Приложения',
        link: '/applications',
        icon: 'web'
      })
    );
    this.menu.addItem(
      new ApplicationMenuItem({
        id: 'users',
        title: 'Пользователи',
        link: '/users',
        icon: 'person'
      })
    );

    /*
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        console.log(event);
        this.menu.setActiveItem(event.urlAfterRedirects);
      }
    );
    */
  }

  fetchInitialData(): Observable<IServerResponse<IControlPanelInitData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IControlPanelInitData>) => {
          if (response.data.applications.length > 0) {
            const menuItem = this.menu.getItemById('applications');
            response.data.applications.forEach((item: IApplication) => {
              const application = new Application(item);
              // this.applications.addApplication(application);
              menuItem.addItem({
                id: String(application.id),
                title: application.title,
                link: `/applications/${application.id}`,
                icon: 'web'
              });
            });
            return response;
          }
        })
      );
  }
}
