import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhoRequestsModule } from './aho-requests.module';
import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { StartComponent } from './components/start/start.component';
import { AuthenticationResolveGuard } from '@kolenergo/lib';
import { AhoRequestsResolveGuard } from './guards/aho-requests-resolve.guard';
import { AhoRequestResolveGuard } from './guards/aho-request-resolve.guard.';
import { AdminComponent } from './components/notifications/admin.component';

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
          AhoRequestResolveGuard
        ]
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AhoRequestsRouterModule { }
