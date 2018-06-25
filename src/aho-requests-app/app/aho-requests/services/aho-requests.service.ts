import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AhoRequestsResource } from '../resources/aho-requests.resource';
import { AhoRequestType } from '../models/aho-request-type.model';
import { IAhoRequestType } from '../interfaces/aho-request-type.interface';
import { AhoRequest } from '../models/aho-request.model';
import { IAhoRequest } from '../interfaces/aho-request.interface';
import { IAddAhoRequest } from '../interfaces/aho-request.add.interface';
import { AhoRequestStatus } from '../models/aho-request-status.model';
import { IAhoRequestStatus } from '../interfaces/aho-request-status.interface';
import { MatTableDataSource } from '@angular/material';
import { AhoRequestTaskContent } from '../models/aho-request-task-content.model';
import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';
import { AuthenticationService, User, UsersService } from '@kolenergo/lib';
import { AhoRequestComment } from '../models/aho-request-comment.model';
import { IAhoRequestComment } from '../interfaces/aho-request-comment.interface';
import { IAhoRequestNeed } from '../interfaces/aho-request-need.interface';

@Injectable()
export class AhoRequestsService {
  private requestTypes: AhoRequestType[];
  private requestStatuses: AhoRequestStatus[];
  private requestTasksContent: AhoRequestTaskContent[];
  private employees: User[];
  private requests: AhoRequest[];
  private employeeRequests: AhoRequest[];
  private needs: IAhoRequestNeed[];
  private selectedRequest: AhoRequest | null;
  private newRequestsCount: number;
  private addRequestInProgress: boolean;
  private editRequestInProgess: boolean;
  private deleteRequestInProgress: boolean;
  private inEmployeeRequestsMode: boolean;
  private dataSource: MatTableDataSource<AhoRequest>;

  constructor(private readonly snackBar: MatSnackBar,
              private readonly authenticationService: AuthenticationService,
              private readonly ahoRequestResource: AhoRequestsResource,
              private readonly usersService: UsersService) {
    this.requestTypes = [];
    this.requestStatuses = [];
    this.requestTasksContent = [];
    this.employees = [];
    this.requests = [];
    this.employeeRequests = [];
    this.needs = [];
    this.selectedRequest = null;
    this.newRequestsCount = 0;
    this.addRequestInProgress = false;
    this.editRequestInProgess = false;
    this.deleteRequestInProgress = false;
    this.inEmployeeRequestsMode = false;
    this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
  }

  /**
   * Получение всех заявок с сервера
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequests(): Promise<AhoRequest[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequests();
      if (result) {
        this.requests = [];
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          this.requests.push(request);
          if (request.status.id === 1) {
            this.newRequestsCount += 1;
          }
          /*
          if (this.authenticationService.getCurrentUser()) {
            if (request.employee && request.employee.id === this.authenticationService.getCurrentUser().id) {
              this.employeeRequests.push(request);
            }
          }
          */
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        return this.requests;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение всех заявок с заданным статусом
   * @param {number} id - Идентификатор статуса заявки
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequestsByStatusId(id: number): Promise<AhoRequest[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestsByStatusId(null, {statusId: id}, null);
      if (result) {
        this.requests = [];
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          this.requests.push(request);
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        return this.requests;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение всех заявок с заданным исполнителем
   * @param {number} id - Идентификатор исполнителя
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequestsByEmployeeId(id: number): Promise<AhoRequest[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestsByEmployeeId(null, {employeeId: id}, null);
      if (result) {
        this.employeeRequests = [];
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          this.employeeRequests.push(request);
        });
        console.log(this.employeeRequests);
        return this.employeeRequests;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Полученеи заявки по идентификатору
   * @param {number} id - Идентификатор заявки
   * @returns {Promise<AhoRequest | null>}
   */
  async fetchRequestById(id: number): Promise<AhoRequest | null> {
    try {
      const result = await this.ahoRequestResource.getRequestById({id: id});
      return result ? new AhoRequest(result) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение типов заявок АХО с сервера
   * @returns {Promise<IAhoRequestType[] | null>}
   */
  async fetchRequestTypes(): Promise<IAhoRequestType[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestTypes();
      if (result) {
        result.forEach((item: IAhoRequestType) => {
          const requestType = new AhoRequestType(item);
          this.requestTypes.push(requestType);
        });
        return this.getRequestTypes();
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение статусов заявок АХО с сервера
   * @returns {Promise<IAhoRequestStatus[] | null>}
   */
  async fetchRequestStatuses(): Promise<IAhoRequestStatus[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestStatuses();
      if (result) {
        result.forEach((item: IAhoRequestStatus) => {
          const requestStatus = new AhoRequestStatus(item);
          this.requestStatuses.push(requestStatus);
        });
        return this.requestStatuses;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение списка сотрудников, задействованных в приложении
   * @returns {Promise<User[] | null>}
   */
  async fetchEmployees(): Promise<User[] | null> {
    const result = await this.usersService.getByAppCode(
      window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null
    );
    this.employees = result ? result : [];
    console.log(this.employees);
    return result;
  }

  /**
   * Получение списка содержимого задач заявок АХО с сервера
   * @returns {Promise<IAhoRequestTaskContent[] | null>}
   */
  async fetchRequestTasksContent(): Promise<IAhoRequestTaskContent[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestTasksContent();
      if (result) {
        result.forEach((item: IAhoRequestTaskContent) => {
          const taskContent = new AhoRequestTaskContent(item);
          this.requestTasksContent.push(taskContent);
        });
        console.log(this.getRequestTasksContent());
        return this.requestTasksContent;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Получение списка потребностей в материалах
   * @returns {Promise<IAhoRequestNeed[] | null>}
   */
  async fetchNeeds(): Promise<IAhoRequestNeed[] | null> {
    try {
      const result = await this.ahoRequestResource.getNeeds();
      if (result) {
        result.forEach((item: IAhoRequestNeed) => {
          this.needs.push(item);
        });
        console.log(this.needs);
        return this.needs;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getRequests(): AhoRequest[] {
    return this.requests;
  }

  /**
   * Получение заявок текущего пользователя, в случае, если он является исполнителем
   * @returns {AhoRequest[]}
   */
  getEmployeeRequests(): AhoRequest[] {
    return this.employeeRequests;
  }

  showAllRequests() {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
    this.inEmployeeRequestsMode = false;
  }

  showEmployeeRequests() {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.employeeRequests);
    this.inEmployeeRequestsMode = true;
  }

  /**
   * Получение списка содержимого задач заявок АХО
   * @returns {AhoRequestTaskContent[]}
   */
  getRequestTasksContent(): AhoRequestTaskContent[] {
    return this.requestTasksContent;
  }

  /**
   * Поиск статуса заявки по идентификатору статуса
   * @param {number} id - Идентификатор статуса
   * @returns {AhoRequestStatus | null}
   */
  getRequestStatusById(id: number): AhoRequestStatus | null {
    let result: AhoRequestStatus | null = null;
    this.requestStatuses.forEach((item: AhoRequestStatus) => {
      if (item.id === id) {
        result = item;
      }
    });
    return result;
  }

  /**
   * Возвращает все статусы заявок АХО
   * @returns {AhoRequestStatus[]}
   */
  getRequestStatuses(): AhoRequestStatus[] {
    return this.requestStatuses;
  }

  /**
   * Добавление новой заявки
   * @param {IAddAhoRequest} request - Добавляемая заявка
   * @returns {Promise<IAhoRequest | null>}
   */
  async addRequest(request: IAddAhoRequest): Promise<IAhoRequest | null> {
    try {
      this.addRequestInProgress = true;
      const result = await this.ahoRequestResource.addRequest(request);
      if (result) {
        this.addRequestInProgress = false;
        const newRequest = new AhoRequest(result);
        this.requests.unshift(newRequest);
        this.newRequestsCount += 1;
        this.snackBar.open(`Ваша заявка добавлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        return newRequest;
      }
    } catch (error) {
      console.error(error);
      this.addRequestInProgress = false;
      return null;
    }
  }

  /**
   * Изменение заявки
   * @param {IAhoRequest} request - Редактируемая заявка
   * @returns {Promise<AhoRequest | null>}
   */
  async editRequest(request: IAhoRequest): Promise<AhoRequest | null> {
    try {
      this.editRequestInProgess = true;
      const result = await this.ahoRequestResource.editRequest(request, null, {id: request.id});
      this.editRequestInProgess = false;
      const request_ = new AhoRequest(result);
      this.snackBar.open(`Изменения в заявке #${request.id} сохранены`, 'Закрыть', {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 3000
      });
      this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
      return request_;
    } catch (error) {
      console.error(error);
      this.editRequestInProgess = false;
      return null;
    }
  }

  /**
   * Удаление заявки
   * @param {number} requestId - Идентификатор заявки
   * @returns {Promise<boolean>}
   */
  async deleteRequest(requestId: number): Promise<boolean> {
    try {
      const result = await this.ahoRequestResource.deleteRequest({id: requestId});
      if (result === true) {
        this.requests.forEach((request: AhoRequest, index: number, array: AhoRequest[]) => {
          if (request.id === requestId) {
            this.requests.splice(index, 1);
          }
        });
        this.snackBar.open(`Заявка #${requestId} удалена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Возвращает все типы заявок АХО
   * @returns {AhoRequestType[]}
   */
  getRequestTypes(): AhoRequestType[] {
    return this.requestTypes;
  }

  getEmployees(): User[] {
    return this.employees;
  }

  /**
   * Поиск типа заявки по идентификатору типа
   * @param {number} requestTypeId - Идентфиикатор типа заявки
   * @returns {AhoRequestType | null}
   */
  getRequestTypeById(requestTypeId: number): AhoRequestType | null {
    const findRequestTypeById = (item: AhoRequestType) => item.id === requestTypeId;
    const requestType = this.requestTypes.find(findRequestTypeById);
    return requestType ? requestType : null;
  }

  /**
   * Статус добавления заявки
   * @returns {boolean}
   */
  isAddingRequest(): boolean {
    return this.addRequestInProgress;
  }

  /**
   * Находится ли приложени в режиме показа заявок исполнителя
   * @returns {boolean}
   */
  isInEmployeeRequestsMode(): boolean {
    return this.inEmployeeRequestsMode;
  }

  /**
   * Возвращает текущую заявку
   * @returns {AhoRequest | null}
   */
  getSelectedRequest(): AhoRequest | null {
    return this.selectedRequest;
  }

  getNewRequestsCount(): number {
    return this.newRequestsCount;
  }

  /**
   * Возвращает DataSource для таблицы с заявками
   * @returns {MatTableDataSource}
   */
  getDataSource(): MatTableDataSource<AhoRequest> {
    return this.dataSource;
  }

  getNeeds(): IAhoRequestNeed[] {
    return this.needs;
  }

  /**
   * Устанавливает текущую заявку
   * @param {AhoRequest | null} request
   */
  setSelectedRequest(request: AhoRequest | null) {
    this.selectedRequest = request;
  }

  /**
   * Добавление комментария к заявке
   * @param {IAhoRequestComment} comment - Комментарий
   * @param {number} requestId - Идентификатор заявки
   * @returns {Promise<AhoRequestComment | null>}
   */
  async addComment(comment: IAhoRequestComment, requestId: number): Promise<AhoRequestComment | null> {
    try {
      const result = await this.ahoRequestResource.addComment(comment, null, {id: requestId});
      if (result) {
        const comment_ = new AhoRequestComment(result);
        this.requests.forEach((item: AhoRequest) => {
          if (item.id === requestId) {
            item.comments.push(comment_);
          }
        });
        return comment_;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
