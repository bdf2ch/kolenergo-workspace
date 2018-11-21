import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { InitDataResolveGuard } from './guards/init-data.resolve.guard';
import { DashboardResource } from './resources/dashboard.resource';
import { StartComponent } from './components/start/start.component';

@NgModule({
  imports: [
    ExportsModule,
  ],
  declarations: [
    DashboardComponent,
    StartComponent
  ],
  providers: [
    DashboardResource,
    DashboardService,
    InitDataResolveGuard
  ]
})
export class DashboardModule {}
