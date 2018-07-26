import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSelectChange } from '@angular/material';
import { AhoRequestsService } from '../../services/aho-requests.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.less']
})
export class RejectRequestComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<RejectRequestComponent>,
              public readonly aho: AhoRequestsService) {}

  ngOnInit() {}


  /**
   * Выбор причины отклонения заявки
   * @param {MatSelectChange} event - Событие выбора
   */
  selectRejectReason(event: MatSelectChange) {
    console.log(event.value);
  }

  /**
   * Закрытие модального окна отклоенния заявки
   */
  closeDialog() {
    this.aho.getSelectedRequest().backup.restore();
    console.log(this.aho.getSelectedRequest().rejectReason);
    this.dialogRef.close();
  }

  async rejectRequest() {
    await this.aho.rejectRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
      });
  }

}
