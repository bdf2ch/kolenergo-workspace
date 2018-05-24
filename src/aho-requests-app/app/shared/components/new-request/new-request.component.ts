import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
      room: ['', Validators.required],
      officeStuffItemTitle0: ['', Validators.required],
      officeStuffItemCount0: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.newRequest.type = this.ahoRequestsService.getRequestTypes()[0];
    this.newRequest.userId = this.authenticationService.getCurrentUser() ? this.authenticationService.getCurrentUser().id : 0;
    this.newRequest.status = this.ahoRequestsService.getRequestStatusById(1);
    this.newRequest.officeStuffList.push(new OfficeStuffListItem());
    //this.newRequest.officeStuffList = [];
  }

  onRequestTypeChange(event: any) {
    console.log(event);
    switch (event.value.id) {
      case 1:
        //setTimeout(() => {
          console.log('1 selected');
          console.log(this.newRequest);
          this.newRequestForm.removeControl('room');
          this.newRequestForm.removeControl('comment');
          this.newRequest.officeStuffList.forEach((item: OfficeStuffListItem, index: number) => {
            this.newRequestForm.addControl(`officeStuffItemTitle${index}`, new FormControl(item.title, Validators.required));
            this.newRequestForm.addControl(`officeStuffItemCount${index}`, new FormControl(item.count, Validators.required));
        //  });

          /*
          this.newRequestForm.addControl(
            `officeStuffItemTitle${this.newRequest.officeStuffList.length.toString()}`,
            new FormControl('', Validators.required)
          );
          this.newRequestForm.addControl(
            `officeStuffItemCount${this.newRequest.officeStuffList.length.toString()}`,
            new FormControl('', Validators.required)
          );
          */
          console.log(this.newRequestForm);
        });
        break;
      default:
        console.log('other selected');
        //setTimeout(() => {
          for (const control in this.newRequestForm.controls) {
            if (control.indexOf('officeStuff') !== -1) {
              this.newRequestForm.removeControl(control);
            }
          }
        // });
        this.newRequestForm.removeControl(`officeStuffItemTitle${this.newRequest.officeStuffList.length.toString()}`);
          this.newRequestForm.removeControl(`officeStuffItemCount${this.newRequest.officeStuffList.length.toString()}`);
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        this.newRequestForm.addControl('comment', new FormControl('', Validators.required));
        console.log(this.newRequestForm);
        break;
    }
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

  addOfficeStuffItem(item: OfficeStuffListItem, index: number) {
    console.log(item, index);
    console.log(this.newRequestForm);

    this.newRequestForm.addControl(`officeStuffItemTitle${index}`, new FormControl('', Validators.required));
    this.newRequestForm.addControl(`officeStuffItemCount${index}`, new FormControl('', Validators.required));

    this.newRequest.officeStuffList.push(new OfficeStuffListItem({
      id: 0,
      requestId: 0,
      title: '',
      count: 1,
      isDone: false,
    }));

    this.officeStuffDataSource = new MatTableDataSource<OfficeStuffListItem>(this.newRequest.officeStuffList);
}

  removeOfficeStuffItem(index: number) {
    this.newRequest.officeStuffList.splice(index, 1);
    this.newRequestForm.removeControl(`officeStuffItemTitle${index}`);
    this.newRequestForm.removeControl(`officeStuffItemCount${index}`);
    this.officeStuffDataSource = new MatTableDataSource<OfficeStuffListItem>(this.newRequest.officeStuffList);
  }

  /**
   * Добавление новой заявки
   * @returns {Promise<void>}
   */
  async addRequest() {
    this.newRequest.officeStuffList.splice(this.newRequest.officeStuffList.length - 1, 1);
    await this.ahoRequestsService.addRequest(this.newRequest);
    this.dialogRef.close();
  }
}
