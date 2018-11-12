import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    ExportsModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {}
