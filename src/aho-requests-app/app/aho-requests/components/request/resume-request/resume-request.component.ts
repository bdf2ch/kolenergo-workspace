import { Component, OnInit } from '@angular/core';
import { AhoRequestsService } from '../../../services/aho-requests.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-resume-request',
  templateUrl: './resume-request.component.html',
  styleUrls: ['./resume-request.component.less']
})
export class ResumeRequestComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<ResumeRequestComponent>,
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
