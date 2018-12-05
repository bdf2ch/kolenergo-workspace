import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportsModule } from '../exports.module';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    ExportsModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    AuthenticationComponent,
    SignInComponent
  ]
})
export class AuthenticationModule {}
