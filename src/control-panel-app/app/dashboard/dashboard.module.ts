import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    ExportsModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {}
