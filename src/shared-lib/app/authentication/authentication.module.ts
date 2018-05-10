import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationResource } from './resources/authentication.resource';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ResourceModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AuthenticationComponent
  ],
  providers: [
    AuthenticationResource,
    AuthenticationService
  ],
  exports: [
    AuthenticationComponent
  ],
  entryComponents: [
    AuthenticationComponent
  ]
})
export class AuthenticationModule { }
