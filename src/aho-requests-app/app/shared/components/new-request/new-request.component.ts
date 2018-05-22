import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AhoRequest } from '../../models/aho-request.model';
import { MatTableDataSource } from '@angular/material';
import { OfficeStuffListItem } from '../../models/office-stuff-list-item.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.less']
})
export class NewRequestComponent implements OnInit {
  newRequestForm: FormGroup;
  newRequest: AhoRequest;
  officeStuffDataSource: MatTableDataSource<OfficeStuffListItem>;
  headerColumns = ['title', 'count', 'controls'];

  constructor(private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<NewRequestComponent>,
              private readonly formBuilder: FormBuilder,
              private readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {
    this.newRequest = new AhoRequest();
    this.officeStuffDataSource = new MatTableDataSource<OfficeStuffListItem>(this.newRequest.officeStuffList);
    this.newRequestForm = this.formBuilder.group({
      comment: ['', Validators.required],
      room: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.newRequest.type = this.ahoRequestsService.getRequestTypes()[0];
    this.newRequest.userId = this.authenticationService.getCurrentUser() ? this.authenticationService.getCurrentUser().id : 0;
    this.newRequest.status = this.ahoRequestsService.getRequestStatusById(1);
    this.newRequest.officeStuffList.push(new OfficeStuffListItem());
    //this.newRequest.officeStuffList = [];
  }


  /**
   * Возвращает текст ошибки для поля ввода кабинета
   * @returns {string}
   */
  getRoomErrorMessage(): string {
    return this.newRequestForm.get('room').hasError('required') ? 'Вы не ввели номер кабинета' : '';
  }

  /**
   * Возвращает текст ошибки для поля ввода комментария
   * @returns {string}
   */
  getCommentErrorMessage(): string {
    return this.newRequestForm.get('comment').hasError('required') ? 'Вы не ввели комментарий к заявке' : '';
  }

  /**
   * Добавление новой заявки
   * @returns {Promise<void>}
   */
  async addRequest() {
    await this.ahoRequestsService.addRequest(this.newRequest);
    this.dialogRef.close();
  }
}
