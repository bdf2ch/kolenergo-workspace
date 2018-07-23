import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AuthenticationService, User } from '@kolenergo/lib';
import { AhoRequestStatus } from '../../models/aho-request-status.model';
import { AhoRequestTask } from '../../models/aho-request-task.model';
import { AhoRequestComment } from '../../models/aho-request-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AhoRequest } from '../../models/aho-request.model';
import { RejectRequestComponent } from '../reject-request/reject-request.component';

@Component({
  selector: 'app-request',
  templateUrl: './aho-request.component.html',
  styleUrls: ['./aho-request.component.less']
})
export class AhoRequestComponent implements OnInit {
  public isRequestChanged: boolean;
  public newComment: AhoRequestComment;
  public newCommentForm: FormGroup;
  public selectedTabIndex: number;
  private backup: AhoRequest;
  // @ViewChild('commentsContainer') commentsContainer: ElementRef;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<AhoRequestComponent>,
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
  }

  tabChange(index: number) {
    console.log('selected index', index);
    this.selectedTabIndex = index;
    switch (index) {
      case 1:
        //console.log(this.commentsContainer);
        //setTimeout(() => {
        //  console.log('scrollHeight', this.commentsContainer.nativeElement.scrollHeight);
        //  this.commentsContainer.nativeElement.scrollTop = this.commentsContainer.nativeElement.scrollHeight;
        //  console.log('scrollTop', this.commentsContainer.nativeElement.scrollTop);
        //  return;
        //}, 0);
            break;
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

  async deleteRequest() {
    await this.aho.deleteRequest(this.aho.getSelectedRequest().id)
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
  }

  async editRequest() {
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

    await this.aho.editRequest(this.aho.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
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

}
