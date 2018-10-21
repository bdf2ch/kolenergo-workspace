import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { StartComponent } from './components/start/start.component';
import { AhoRequestsResolveGuard } from './guards/aho-requests-resolve.guard';
import { AhoRequestResolveGuard } from './guards/aho-request-resolve.guard.';
import { AdminComponent } from './components/admin/admin.component';
import { AhoRequestsAdminGuard } from './guards/admin.can-activate.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { AhoRequestsWrapperComponent } from './components/aho-requests-wrapper/aho-requests-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent,
   /*
    resolve: [
      AhoRequestsResolveGuard
    ],
    */
    canActivate: [
      AhoRequestsResolveGuard
    ],
    children: [
      {
        path: '',
        component: AhoRequestsWrapperComponent,
        children: [
          {
            path: '',
            component: StartComponent,
            canActivate: [
              AuthGuard
            ]
          },
          {
            path: 'request/:id',
            component: StartComponent,
            canActivate: [
              AuthGuard
            ],
            resolve: [
              AhoRequestResolveGuard
            ]
          },
          {
            path: 'admin',
            component: AdminComponent,
            canActivate: [
              AhoRequestsAdminGuard
            ]
          }
        ]
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      }
    ]
  }
  /*
  {
    path: 'welcome',
    component: WelcomeComponent,
    resolve: [
      AhoRequestsResolveGuard
    ],
  }
  */
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AhoRequestsRouterModule { }
