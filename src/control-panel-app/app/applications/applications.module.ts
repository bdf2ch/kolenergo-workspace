import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsResource } from './resources/applications.resource';
import { ApplicationComponent } from './components/application/application.component';


@NgModule({
  imports: [
    ExportsModule,
    DashboardModule,
    ApplicationsRoutingModule
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationsListComponent,
    ApplicationComponent
  ],
  providers: [
    ApplicationsResource,
    ApplicationsService
  ]
})
export class ApplicationsModule {
  constructor(private readonly applications: ApplicationsService) {
    console.log('applications module loaded successfully');
    this.applications.fetchApplicationsList().subscribe();
  }
}
