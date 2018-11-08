import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationsService } from './services/applications.service';


@NgModule({
  imports: [
    ExportsModule,
    ApplicationsRoutingModule
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationsListComponent
  ],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
