import { NgModule } from '@angular/core';
import { AhoRequestsRouterModule } from './aho-requests.router.module';
import { ExportsModule } from '../exports.module';
import { UsersModule } from '@kolenergo/lib';

import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { StartComponent } from './components/start/start.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { AhoRequestComponent } from './components/request/aho-request.component';
import { AhoRequestsService } from './services/aho-requests.service';
import { AhoRequestsResolveGuard } from './guards/aho-requests-resolve.guard';
import { AhoRequestsResource } from './resources/aho-requests.resource';
import { AhoRequestResolveGuard } from './guards/aho-request-resolve.guard.';
import { TaskContentByRequestTypePipe } from './pipes/task-content-by-request-type.pipe';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [
    ExportsModule,
    AhoRequestsRouterModule,
    UsersModule
  ],
  declarations: [
    AhoRequestsComponent,
    StartComponent,
    AhoRequestComponent,
    NewRequestComponent,
    TaskContentByRequestTypePipe
  ],
  providers: [
    AhoRequestsResource,
    AhoRequestsService,
    AhoRequestsResolveGuard,
    AhoRequestResolveGuard,
    MatIconRegistry,
  ],
  entryComponents: [
    AhoRequestComponent,
    NewRequestComponent
  ],
  exports: []
})
export class AhoRequestsModule {
  constructor(private readonly matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
