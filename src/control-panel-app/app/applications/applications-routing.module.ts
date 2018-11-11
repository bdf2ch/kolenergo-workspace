import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsResolveGuard } from './guards/applications.resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: '',
        component: ApplicationsListComponent,
        resolve: [
          ApplicationsResolveGuard
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationsRoutingModule {}
