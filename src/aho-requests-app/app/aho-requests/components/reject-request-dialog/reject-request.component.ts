import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSelectChange } from '@angular/material';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AhoRequestRejectReason} from '../../models/aho-request-reject-reason.model';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.less']
})
export class RejectRequestComponent implements OnInit {
  public newRejectReasonForm: FormGroup;
  public inNewRejectReasonMode: boolean;

  constructor(private readonly dialogRef: MatDialogRef<RejectRequestComponent>,
              public readonly aho: AhoRequestsService) {
    this.inNewRejectReasonMode = false;
    this.newRejectReasonForm = new FormGroup({
      title: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}


  /**
   * Выбор причины отклонения заявки
   * @param {MatSelectChange} event - Событие выбора
   */
  selectRejectReason(event: MatSelectChange) {
    console.log(event.value);
    if (event.value === 'new-reason') {
      this.inNewRejectReasonMode = true;
    } else {
      this.inNewRejectReasonMode = false;
      this.newRejectReasonForm.reset();
    }
  }

  /**
   * Закрытие модального окна отклоенния заявки
   */
  closeDialog() {
    this.aho.getSelectedRequest().backup.restore();
    console.log(this.aho.getSelectedRequest().rejectReason);
    this.dialogRef.close();
  }

  /**
   * Отклонение заявки
   */
  async rejectRequest() {
    if (this.inNewRejectReasonMode) {
      const rejectReason = await this.aho.addRejectReason(
        new AhoRequestRejectReason({
        id: 0,
        requestTypeId: this.aho.getSelectedRequest().type.id,
        content: this.newRejectReasonForm.controls['title'].value
      }));
      this.aho.getSelectedRequest().rejectReason = rejectReason;
    }
    console.log(this.aho.getSelectedRequest());
    await this.aho.rejectRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
        this.newRejectReasonForm.reset();
      });
  }

}
