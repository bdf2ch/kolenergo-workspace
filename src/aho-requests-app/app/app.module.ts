import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationModule } from '../../shared-lib/api';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { ResolveGuard } from '../../shared-lib/api';


const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    resolve: [ResolveGuard]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AuthenticationModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    StartComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
