import { Injectable } from '@angular/core';
import { ApplicationMenuManager } from '../models/application-menu-manager.model';
import { ApplicationMenuItem } from '../models/application-menu-item.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class DashboardService {
  public menu: ApplicationMenuManager;

  constructor(private readonly router: Router) {
    this.menu = new ApplicationMenuManager();
    this.menu.addMenuItem(
      new ApplicationMenuItem({
        id: 'applications',
        title: 'Приложения',
        link: '/applications',
        icon: 'web'
      })
    );
    this.menu.addMenuItem(
      new ApplicationMenuItem({
        id: 'users',
        title: 'Пользователи',
        link: '/users',
        icon: 'person'
      })
    );

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.menu.setActiveMenuItem(event.url);
      }
    );
  }
}
