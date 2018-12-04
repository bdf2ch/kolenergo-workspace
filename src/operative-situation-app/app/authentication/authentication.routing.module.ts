import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import {OperativeSituationComponent} from "../operative-situation/components/operative-situation/operative-situation.component";
import {ReportsResolveGuard} from "../operative-situation/guards/reports.resolve.guard";

const routes: Routes = [
  {
    path: '',
    component: OperativeSituationComponent,
    resolve: [
      ReportsResolveGuard
    ]
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AuthenticationRoutingModule {}
