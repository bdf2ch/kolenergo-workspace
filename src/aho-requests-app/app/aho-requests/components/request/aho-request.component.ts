import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestStatus } from '../../models/aho-request-status.model';
import { AhoRequestTask } from '../../models/aho-request-task.model';
import {AhoRequestComment } from '../../models/aho-request-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './aho-request.component.html',
  styleUrls: ['./aho-request.component.less']
})
export class AhoRequestComponent implements OnInit {
  public isRequestChanged: boolean;
  public newComment: AhoRequestComment;
  newCommentForm: FormGroup;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly dialogRef: MatDialogRef<AhoRequestComponent>,
              public readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {
    this.isRequestChanged = false;
    this.newComment = new AhoRequestComment();
  }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.router.navigate(['']);
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.ahoRequestsService.setSelectedRequest(null);
    });
  }

  selectEmployee(value: any) {
    console.log(value);
    this.ahoRequestsService.getSelectedRequest().employee = value.value;
    const findStatusById = (item: AhoRequestStatus) => item.id === 2;
    const status = this.ahoRequestsService.getRequestStatuses().find(findStatusById);
    this.ahoRequestsService.getSelectedRequest().status = status;
    this.isRequestChanged = true;
  }

  completeTask(value: any, task: AhoRequestTask) {
    console.log(value, task);
    task.done = value.selected;
    this.isRequestChanged = true;
  }

  async deleteRequest() {
    await this.ahoRequestsService.deleteRequest(this.ahoRequestsService.getSelectedRequest().id)
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
  }

  async editRequest() {
    if (this.ahoRequestsService.getSelectedRequest().isAllTasksCompleted()) {
      const findStatusById = (item: AhoRequestStatus) => item.id === 3;
      const status = this.ahoRequestsService.getRequestStatuses().find(findStatusById);
      this.ahoRequestsService.getSelectedRequest().status = status;
      console.log(this.ahoRequestsService.getSelectedRequest());
    } else {
      const findStatusById = (item: AhoRequestStatus) => item.id === 2;
      const status = this.ahoRequestsService.getRequestStatuses().find(findStatusById);
      this.ahoRequestsService.getSelectedRequest().status = status;
    }

    await this.ahoRequestsService.editRequest(this.ahoRequestsService.getSelectedRequest())
      .then(() => {
        this.dialogRef.close();
        this.router.navigate(['']);
      });
    }

    async addComment() {
      await this.ahoRequestsService.addComment(this.newComment, this.ahoRequestsService.getSelectedRequest().id)
        .then(() => {
          this.newComment = new AhoRequestComment();
          this.newCommentForm.reset({
            comment: this.newComment.content
          });
        });
    }

}
