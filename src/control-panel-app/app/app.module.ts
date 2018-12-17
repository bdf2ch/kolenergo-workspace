import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportsModule } from './exports.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {ApplicationsService} from './applications/services/applications.service';
import {DashboardService} from './dashboard/services/dashboard.service';
import {ApplicationMenuItem} from './dashboard/models/application-menu-item.model';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    DashboardModule,
    ExportsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DashboardService
  ],
  entryComponents: []
})
export class AppModule {

  /**
   * Конструктор
   * @param dashboard
   */
  constructor(private readonly dashboard: DashboardService) {
    if (window.localStorage) {
      window.localStorage.setItem('app_code', environment.appCode);
    }

    /**
     * Регистрация элементов меню приложения
     */
    this.dashboard.menu.addItem(
      new ApplicationMenuItem({
        id: 'dashboard',
        title: 'Главная',
        link: '/dashboard',
        icon: 'dashboard'
      })
    );
    this.dashboard.menu.addItem(
      new ApplicationMenuItem({
        id: 'applications',
        title: 'Приложения',
        link: '/applications',
        icon: 'web'
      })
    );
    this.dashboard.menu.addItem(
      new ApplicationMenuItem({
        id: 'companies',
        title: 'Организации',
        link: '/companies',
        icon: 'business'
      })
    );
    this.dashboard.menu.addItem(
      new ApplicationMenuItem({
        id: 'users',
        title: 'Пользователи',
        link: '/users',
        icon: 'person'
      })
    );

  }
}
