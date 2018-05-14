import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationModule } from '../../shared-lib/api';
import { AppComponent } from './app.component';
import { StartComponent } from './aho-requests/start/start.component';
import { ResolveGuard } from '../../shared-lib/api';
import { AhoRequestsComponent } from './aho-requests/aho-requests.component';
import { AhoRequestsService } from './shared/services/aho-requests.service';
import { AhoRequestsResolveGuard } from './shared/guards/resolve.guard';
import { AhoRequestsResource } from './shared/resources/aho-requests.resource';


const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent,
    resolve: [
      ResolveGuard,
      AhoRequestsResolveGuard
    ],
    children: [
      {
        path: '',
        component: StartComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ResourceModule.forRoot(),
    AuthenticationModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    StartComponent,
    AhoRequestsComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MatIconRegistry,
    AhoRequestsResource,
    AhoRequestsService,
    AhoRequestsResolveGuard
  ]
})
export class AppModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
