import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { AppComponent } from './app.component';
import { AuthDialogComponent } from './shared/components/auth-dialog/auth-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  entryComponents: [AuthDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
