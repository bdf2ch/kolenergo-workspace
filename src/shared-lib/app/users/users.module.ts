import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersResource } from './resources/users.resource';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UsersResource,
    UsersService
  ]
})
export class UsersModule { }
