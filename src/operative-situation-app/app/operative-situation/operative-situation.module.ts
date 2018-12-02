import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { OperativeSituationService } from './services/operative-situation.service';
import { OperativeSituationResource } from './resources/operative-situation.resource';


@NgModule({
  imports: [
    ExportsModule,
  ],
  declarations: [],
  providers: [
    OperativeSituationResource,
    OperativeSituationService
  ],
  entryComponents: []
})
export class OperativeSituationModule {

  constructor() {}
}
