import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { UsersResource } from './resources/users.resource';
import { UsersService } from './services/users.service';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  imports: [
    ExportsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UsersListComponent
  ],
  providers: [
    UsersResource,
    UsersService
  ]
})
export class UsersModule {
  constructor() {
    console.log('Users module loaded successfully');
  }
}


