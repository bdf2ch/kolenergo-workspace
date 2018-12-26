import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportsModule } from './exports.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DashboardService } from './dashboard/services/dashboard.service';
import { ApplicationMenuItem } from './dashboard/models/application-menu-item.model';
import { MatDialog } from '@angular/material';
import { CompanyAddDialogComponent } from './companies/components/company-add-dialog/company-add-dialog.component';

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
  constructor(private readonly dialog: MatDialog,
              private readonly dashboard: DashboardService) {
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
        icon: 'web'
      })
    );

    this.dashboard.menu.addItem(
      new ApplicationMenuItem({
        id: 'companies',
        title: 'Организации',
        icon: 'business',
        isButtonEnabled: true,
        buttons: []
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
