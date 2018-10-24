import { Component, OnInit } from '@angular/core';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-resume-request',
  templateUrl: './resume-request-dialog.component.html',
  styleUrls: ['./resume-request-dialog.component.less']
})
export class ResumeRequestDialogComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<ResumeRequestDialogComponent>,
              public readonly aho: AhoRequestsService) {}

  ngOnInit() {}

  /**
   * Возобновление заявки
   */
  async resumeRequest() {
    await this.aho.resumeRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
      });
  }
}
