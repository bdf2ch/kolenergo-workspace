import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.less']
})
export class AuthDialogComponent implements OnInit {

  constructor(private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
