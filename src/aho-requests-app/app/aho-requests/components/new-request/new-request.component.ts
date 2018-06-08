import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@kolenergo/lib';
import { AhoRequestsService } from '../../services/aho-requests.service';
import { AhoRequest } from '../../models/aho-request.model';
import { MatTableDataSource } from '@angular/material';
import { AhoRequestTask } from '../../models/aho-request-task.model';
import { AhoRequestTaskContent } from '../../models/aho-request-task-content.model';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.less']
})
export class NewRequestComponent implements OnInit {
  newRequestForm: FormGroup;
  newRequest: AhoRequest;
  tasksDataSource: MatTableDataSource<AhoRequestTask>;
  headerColumns: string[];

  constructor(private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<NewRequestComponent>,
              private readonly formBuilder: FormBuilder,
              private readonly authenticationService: AuthenticationService,
              public readonly ahoRequestsService: AhoRequestsService) {
    this.newRequest = new AhoRequest();
    this.headerColumns = [];
  }

  ngOnInit() {
    this.newRequestForm = this.formBuilder.group({});
    this.newRequest.type = this.ahoRequestsService.getRequestTypes()[0];
    this.newRequest.user = this.authenticationService.getCurrentUser();
    this.newRequest.status = this.ahoRequestsService.getRequestStatusById(1);
    this.headerColumns = this.newRequest.type.isCountable ? ['title', 'count', 'controls'] : ['title', 'controls'];
    this.addTask();
    this.tasksDataSource = new MatTableDataSource<AhoRequestTask>(this.newRequest.tasks);
  }

  /**
   * Изменение типа заявки АХО
   * @param event - Выбранный типа заявки
   */
  onRequestTypeChange(event: any) {
    this.newRequest.tasks = [];
    this.newRequest.tasks.push(new AhoRequestTask());
    this.headerColumns = this.newRequest.type.isCountable ? ['title', 'count', 'controls'] : ['title', 'controls'];
    for (const control in this.newRequestForm.controls) {
      this.newRequestForm.removeControl(control);
    }
    this.newRequestForm.addControl(
      `taskTitle${this.newRequest.tasks[this.newRequest.tasks.length - 1].timeAdded}`,
      new FormControl('', Validators.required)
    );

    switch (event.value.isCountable) {
      case true:
        this.newRequestForm.removeControl('room');
        this.newRequestForm.addControl(
          `taskCount${this.newRequest.tasks[this.newRequest.tasks.length - 1].timeAdded}`,
          new FormControl('', Validators.required)
        );
          console.log(this.newRequestForm);
          break;
      default:
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        console.log(this.newRequestForm);
        break;
    }
    this.tasksDataSource = new MatTableDataSource<AhoRequestTask>(this.newRequest.tasks);
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
   * Добавление задачи в заявку
   */
  addTask() {
    console.log(this.newRequestForm);
    console.log(this.newRequest.tasks);
    for (const control in this.newRequestForm.controls) {
      this.newRequestForm.controls[control].disable();
    }
    this.newRequest.tasks.push(new AhoRequestTask());
    this.newRequestForm.addControl(
      `taskTitle${this.newRequest.tasks[this.newRequest.tasks.length - 1].timeAdded.toString()}`,
      new FormControl('', Validators.required)
    );
    if (this.newRequest.type.isCountable) {
      this.newRequestForm.addControl(
        `taskCount${this.newRequest.tasks[this.newRequest.tasks.length - 1].timeAdded.toString()}`,
        new FormControl('', Validators.required)
      );
    }
    this.tasksDataSource = new MatTableDataSource<AhoRequestTask>(this.newRequest.tasks);
}

  /**
   * Удаление задачи в заявке
   * @param {AhoRequestTask} task - Удаляемая задача
   */
  removeTask(task: AhoRequestTask) {
    this.newRequest.tasks.forEach((item: AhoRequestTask, index: number, array: AhoRequestTask[]) => {
      if (item.timeAdded === task.timeAdded) {
        array.splice(index, 1);
      }
    });
    this.newRequestForm.removeControl(`taskTitle${task.timeAdded}`);
    if (this.newRequest.type.isCountable) {
      this.newRequestForm.removeControl(`taskCount${task.timeAdded}`);
    }
    this.tasksDataSource = new MatTableDataSource<AhoRequestTask>(this.newRequest.tasks);
  }

  /**
   * Отображает наименование выбранного содержимого задачи заявки в поле ввода
   * @param {AhoRequestTaskContent} taskContent - Выбраанное содержимое задачи
   * @returns {string}
   */
  displayTaskContentTitle(taskContent: AhoRequestTaskContent | null): string {
    return taskContent ? taskContent.title : null;
  }

  /**
   * Добавление новой заявки
   * @returns {Promise<void>}
   */
  async addRequest() {
    this.newRequest.tasks.splice(this.newRequest.tasks.length - 1, 1);
    await this.ahoRequestsService.addRequest(this.newRequest);
    this.dialogRef.close();
  }
}
