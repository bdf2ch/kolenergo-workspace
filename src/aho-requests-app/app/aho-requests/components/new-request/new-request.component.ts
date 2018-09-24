import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService, User } from '@kolenergo/lib';
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
  newTaskForm: FormGroup;
  newRequest: AhoRequest;
  newTask: AhoRequestTask;
  tasksDataSource: MatTableDataSource<AhoRequestTask>;
  headerColumns: string[];
  now: Date;

  constructor(private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<NewRequestComponent>,
              private readonly formBuilder: FormBuilder,
              private readonly authenticationService: AuthenticationService,
              public readonly aho: AhoRequestsService) {
    this.newRequest = new AhoRequest();
    this.newTask = new AhoRequestTask();
    this.headerColumns = [];
    this.now = new Date();
  }

  ngOnInit() {
    this.newRequest.type = this.aho.getRequestTypes()[0];
    this.newRequest.user = this.authenticationService.getCurrentUser();
    this.newRequest.status = this.aho.getRequestStatusById(1);
    this.headerColumns = this.newRequest.type.isCountable ? ['title', 'count', 'controls'] : ['title', 'controls'];
    this.newRequestForm = this.formBuilder.group({
      initiator: [null]
    });
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      count: [1, Validators.required]
    });
    this.tasksDataSource = new MatTableDataSource<AhoRequestTask>(this.newRequest.tasks);
    console.log(this.newRequest);
  }

  /**
   * Изменение типа заявки АХО
   * @param event - Выбранный тип заявки
   */
  onRequestTypeChange(event: any) {
    this.newRequest.tasks = [];
    this.headerColumns = this.newRequest.type.isCountable ? ['title', 'count', 'controls'] : ['title', 'controls'];
    for (const control in this.newRequestForm.controls) {
      this.newRequestForm.removeControl(control);
    }
    switch (event.value.id) {
      case 2:
        this.newRequestForm.addControl('initiator', new FormControl(null));
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        break;
      case 3:
        this.newRequestForm.addControl('initiator', new FormControl(null));
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        this.newRequestForm.addControl('expires', new FormControl(null));
        break;
      case 8:
        this.newRequestForm.addControl('initiator', new FormControl(null));
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        break;
      case 10:
        this.newRequestForm.addControl('initiator', new FormControl(null));
        this.newRequestForm.addControl('room', new FormControl('', Validators.required));
        this.newRequestForm.addControl('numberOfLoaders', new FormControl(null));
        this.newRequestForm.addControl('expires', new FormControl(null));
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
    console.log(this.newTaskForm);
    console.log(this.newRequest.tasks);
    this.newRequest.tasks.push(this.newTask);
    this.newTask = new AhoRequestTask();
    this.newTaskForm.reset({ title: '', count: 1 });
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

  changeExpirationDate(value: any) {
    console.log(value);
    this.newRequest.dateExpires = value.value;
  }

  /**
   * Добавление новой заявки
   * @returns {Promise<void>}
   */
  async addRequest() {
    let employee = null;
    switch (this.newRequest.type.id) {
      case 3:
        employee = this.aho.getEmployeeById(18);
        break;
      case 10:
        employee = this.aho.getEmployeeById(20);
        break;
    }
    if (employee) {
      this.newRequest.employees.push(employee);
    }
    await this.aho.addRequest(this.newRequest).then(() => {
      this.dialogRef.close();
    });
  }
}
