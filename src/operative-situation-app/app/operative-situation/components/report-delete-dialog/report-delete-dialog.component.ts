import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';

import { OperativeSituationService } from '../../services/operative-situation.service';

@Component({
  selector: 'app-report-delete-dialog',
  templateUrl: './report-delete-dialog.component.html',
  styleUrls: ['./report-delete-dialog.component.less']
})
export class ReportDeleteDialogComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<ReportDeleteDialogComponent>,
              private readonly snackBar: MatSnackBar,
              public readonly osr: OperativeSituationService) {}

  ngOnInit() {
  }

  deleteReport() {
    this.osr.deleteReport(this.osr.selectedReport$.getValue().id)
      .subscribe((result: boolean) => {
        if (result === true) {
          this.closeDialog();
          this.snackBar.open(`Отчет об оперативной обстановке удален`, 'Закрыть', {
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            duration: 3000
          });
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
