import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OperativeSituationModule } from './operative-situation/operative-situation.module';
import { ExportsModule } from './exports.module';
import { ApplicationRoutingModule } from './application.routing.module';
import { AppComponent } from './app.component';
import { OperativeSituationService } from './operative-situation/services/operative-situation.service';
import { environment } from '../environments/environment';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    OperativeSituationModule,
    ExportsModule,
    ApplicationRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    OperativeSituationService
  ],
  entryComponents: []
})
export class AppModule {

  /**
   * Конструктор
   */
  constructor() {
    if (window.localStorage) {
      window.localStorage.setItem('app_code', environment.appCode);
    }
  }
}
