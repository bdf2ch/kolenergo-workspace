import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { ElModule } from 'element-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuthenticationModule } from '../../shared-lib/api';
import { AppComponent } from './app.component';
import { StartComponent } from './aho-requests/start/start.component';
import { AuthenticationResolveGuard } from '../../shared-lib/api';
import { AhoRequestsComponent } from './aho-requests/aho-requests.component';
import { AhoRequestsService } from './shared/services/aho-requests.service';
import { AhoRequestsResolveGuard } from './shared/guards/aho-requests-resolve.guard';
import { AhoRequestsResource } from './shared/resources/aho-requests.resource';
import { NewRequestComponent } from './shared/components/new-request/new-request.component';
import { RequestComponent } from './aho-requests/request/request.component';
import { RequestResolveGuard } from './aho-requests/request/request-resolve.guard';


const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent,
    resolve: [
      AuthenticationResolveGuard,
      AhoRequestsResolveGuard
    ],
    children: [
      {
        path: '',
        component: StartComponent,
      },
      {
        path: 'request/:id',
        component: StartComponent,
        resolve: [
          RequestResolveGuard
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ResourceModule.forRoot(),
    ElModule.forRoot(),
    AuthenticationModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  declarations: [
    AppComponent,
    StartComponent,
    AhoRequestsComponent,
    NewRequestComponent,
    RequestComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    MatIconRegistry,
    AhoRequestsResource,
    AhoRequestsService,
    AhoRequestsResolveGuard,
    RequestResolveGuard
  ],
  entryComponents: [
    RequestComponent,
    NewRequestComponent
  ]
})
export class AppModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
