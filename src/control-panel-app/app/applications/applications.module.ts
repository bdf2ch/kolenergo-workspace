import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsService } from './services/applications.service';
import { ApplicationsResolveGuard } from './guards/applications.resolve.guard';
import { ApplicationsResource } from './resources/applications.resource';
import { ApplicationComponent } from './components/application/application.component';


@NgModule({
  imports: [
    ExportsModule,
    ApplicationsRoutingModule
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationsListComponent,
    ApplicationComponent
  ],
  providers: [
    ApplicationsResource,
    ApplicationsService,
    ApplicationsResolveGuard
  ]
})
export class ApplicationsModule {}
