import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationModule } from '../../shared-lib/api';
import { AppComponent } from './app.component';
import { StartComponent } from './aho-requests/start/start.component';
import { ResolveGuard } from '../../shared-lib/api';
import { AhoRequestsComponent } from './aho-requests/aho-requests.component';


const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent,
    resolve: [ResolveGuard],
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
    AuthenticationModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
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
    MatIconRegistry
  ]
})
export class AppModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
