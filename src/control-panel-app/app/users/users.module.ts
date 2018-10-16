import { NgModule } from '@angular/core';
import { ExportsModule } from '../exports.module';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    ExportsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent
  ]
})
export class UsersModule {}
