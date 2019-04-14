import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportsModule } from './exports.module';
import { AhoRequestsModule } from './aho-requests/aho-requests.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ExportsModule,
    AhoRequestsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  entryComponents: [],
  exports: [
    ExportsModule
  ]
})
export class AppModule {
  constructor() {
    if (window.localStorage) {
      window.localStorage.setItem('app_code', environment.appCode);
    }
  }
}
