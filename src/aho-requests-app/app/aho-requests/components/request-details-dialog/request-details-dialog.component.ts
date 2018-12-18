import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AuthenticationService } from '@kolenergo/lib';
import { User } from '@kolenergo/cpa';
import { AhoRequestStatus } from '../../models/aho-request-status.model';
import { AhoRequestTask } from '../../models/aho-request-task.model';
import { AhoRequestComment } from '../../models/aho-request-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatTabChangeEvent } from '@angular/material';
import { AhoRequest } from '../../models/aho-request.model';
import { RejectRequestComponent } from '../reject-request-dialog/reject-request.component';
import { ResumeRequestDialogComponent } from '../resume-request-dialog/resume-request-dialog.component';
import { DeleteRequestDialogComponent } from '../delete-request-dialog/delete-request-dialog.component';
import {IAhoRequestTask} from '../../interfaces/aho-request-task.interface';
import {CancelRequestDialogComponent} from '../cancel-request-dialog/cancel-request-dialog.component';

@Component({
  selector: 'app-request',
  templateUrl: './request-details-dialog.component.html',
  styleUrls: ['./request-details-dialog.component.less']
})
export class RequestDetailsDialogComponent implements OnInit {
  public isRequestChanged: boolean;
  public newComment: AhoRequestComment;
  public newCommentForm: FormGroup;
  public selectedTabIndex: number;
  private backup: AhoRequest;
  @ViewChild('detailsTab') detailsTab: ElementRef;
  @ViewChild('commentsTab') commentsTab: ElementRef;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<RequestDetailsDialogComponent>,
              private readonly renderer: Renderer2,
              public readonly auth: AuthenticationService,
              public readonly aho: AhoRequestsService) {
    this.selectedTabIndex = 0;
    this.isRequestChanged = false;
    this.backup = new AhoRequest();
    this.newComment = new AhoRequestComment();
  }

  ngOnInit() {
    console.log(this.aho.getSelectedRequest());
    this.backup.fromAnother(this.aho.getSelectedRequest());
    this.newComment.requestId = this.aho.getSelectedRequest().id;
    this.newComment.userId = this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0;
    this.newCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['']);
      this.aho.getSelectedRequest().backup.restore();
    });

    this.dialogRef.beforeClose().subscribe(() => {
      console.log('before close');
      this.aho.getSelectedRequest().backup.restore();
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.aho.setSelectedRequest(null);
    });


    console.log(this.commentsTab.nativeElement.style.height);
  }

  tabChange(index: number) {
    console.log('selected index', index);
    this.selectedTabIndex = index;
    switch (index) {
      case 1:
        // this.commentsTab.nativeElement.style.height = this.height + 'px';
        break;
    }
  }


  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.renderer.setStyle(this.commentsTab.nativeElement, 'height', this.detailsTab.nativeElement.offsetHeight + 10 + 'px');
    }
  }

  selectEmployee(value: any) {
    console.log(value);
    this.aho.getSelectedRequest().employees.push(value.value);
    const findStatusById = (item: AhoRequestStatus) => item.id === 2;
    const status = this.aho.getRequestStatuses().find(findStatusById);
    this.aho.getSelectedRequest().status = status;
    this.isRequestChanged = true;
    console.log(this.aho.getSelectedRequest());
  }

  /**
   * Удаление исполнителя заявки
   * @param {User} employee - Исполнитель заявки
   */
  removeRequestEmployee(employee: User) {
    console.log('removed employee', employee);
    this.aho.getSelectedRequest().employees.forEach((item: User, index: number, array: User[]) => {
      if (item.id === employee.id) {
        array.splice(index, 1);
        this.isRequestChanged = true;
      }
    });
  }

  /**
   * Выбор исполнителя заявки
   * @param {MatAutocompleteSelectedEvent} data - Информация о событии
   */
  selectRequestEmployee(data: MatAutocompleteSelectedEvent) {
    console.log(data);
    this.aho.getSelectedRequest().employees.push(data.option.value);
    this.isRequestChanged = true;
  }


  displayEmployee(employee: User | null): string {
    return employee ? employee.fio : '';
  }

  completeTask(value: any, task: AhoRequestTask) {
    console.log(value, task);
    task.done = value.selected;
    this.isRequestChanged = true;
  }

  /**
   * Удаление заявки
   */
  async deleteRequest() {
    this.dialog.open(DeleteRequestDialogComponent, {
      width: '400px'
    });
  }

  async editRequest() {
    /*
    if (this.aho.getSelectedRequest().isAllTasksCompleted()) {
      const findStatusById = (item: AhoRequestStatus) => item.id === 3;
      const status = this.aho.getRequestStatuses().find(findStatusById);
      this.aho.getSelectedRequest().status = status;
      console.log(this.aho.getSelectedRequest());
    } else {
      const findStatusById = (item: AhoRequestStatus) => item.id === 2;
      const status = this.aho.getRequestStatuses().find(findStatusById);
      this.aho.getSelectedRequest().status = status;
    }
    */

    await this.aho.editRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
  }

  async cancelRequest() {
    this.dialog.open(CancelRequestDialogComponent, {
      width: '400px'
    });
  }

    async addComment() {
      await this.aho.addComment(this.newComment, this.aho.getSelectedRequest().id)
        .then(() => {
          this.newComment = new AhoRequestComment();
          this.newComment.requestId = this.aho.getSelectedRequest().id;
          this.newComment.userId = this.auth.getCurrentUser() ? this.auth.getCurrentUser().id : 0;
          this.newCommentForm.reset({
            comment: this.newComment.content
          });
        });
    }


    addEmployee(data: any) {
    console.log(data);
    }


  /**
   * Показ диалогового окна отклонения заявки
   */
  rejectRequest() {
    console.log('rejectReason', this.aho.getSelectedRequest().rejectReason);
    this.dialog.open(RejectRequestComponent, {
      width: '400px'
    });
  }

  /**
   * Открытие диалогового окна подтверждения возобновления заявки
   */
  async resumeRequest() {
    this.dialog.open(ResumeRequestDialogComponent, {
      width: '400px'
    });
  }

  /**
   * Отправка заявки в работу
   */
  async setRequestStatus() {
    const status = this.aho.getRequestStatusById(2);
    if (status) {
      await this.aho.setRequestStatus(this.aho.getSelectedRequest(), status);
    }
  }

  /**
   * Экспорт заявки в Excel
   */
  async exportRequest() {
    await this.aho.fetchRequestExport(this.aho.getSelectedRequest().id);
  }

  onExpirationDateChange(value: any) {
    console.log('date', value);
    this.aho.getSelectedRequest().dateExpires = value.value;
    this.isRequestChanged = true;
  }

  isTaskDisabled(task: IAhoRequestTask) {
    let result = false;
    switch (task.content.requestTypeId) {
      case 1:
        result = this.auth.getCurrentUser().permissions.getRoleById(5) || this.auth.getCurrentUser().permissions.getRoleById(1)
          ? false : true;
        break;
      case 2:
        result = this.auth.getCurrentUser().permissions.getRoleById(3) || this.auth.getCurrentUser().permissions.getRoleById(1)
          ? false : true;
        break;
      case 3:
        result = this.auth.getCurrentUser().permissions.getRoleById(2) || this.auth.getCurrentUser().permissions.getRoleById(1)
          ? false : true;
        break;
      case 8:
        result = this.auth.getCurrentUser().permissions.getRoleById(4) || this.auth.getCurrentUser().permissions.getRoleById(1)
          ? false : true;
        break;
      case 10:
        result = this.auth.getCurrentUser().permissions.getRoleById(6) || this.auth.getCurrentUser().permissions.getRoleById(1)
          ? false : true;
        break;
    }
    console.log('is task disabled', result);
    return result;
  }
}
