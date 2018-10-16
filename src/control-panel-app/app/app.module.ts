import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportsModule } from './exports.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

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
  providers: [],
  entryComponents: []
})
export class AppModule {
  constructor() {
    if (window.localStorage) {
      window.localStorage.setItem('app_code', environment.appCode);
    }
  }
}
