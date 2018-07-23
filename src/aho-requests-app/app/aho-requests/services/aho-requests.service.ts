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
import { MatSlideToggleChange, MatTableDataSource } from '@angular/material';
import { AhoRequestTaskContent } from '../models/aho-request-task-content.model';
import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';
import { AuthenticationService, User, UsersService } from '@kolenergo/lib';
import { AhoRequestComment } from '../models/aho-request-comment.model';
import { IAhoRequestComment } from '../interfaces/aho-request-comment.interface';
import { IAhoRequestNeed } from '../interfaces/aho-request-need.interface';
import { AhoRequestFilter } from '../models/aho-request-filter.model';
import { FilterManager } from '../models/filter-manager.model';
import { ShowCompletedRequestsPipe } from '../pipes/show-completed-requests.pipe';
import * as saver from 'file-saver';
import {IAhoRequestRejectReason} from '../interfaces/aho-request-reject-reason.interface';
import {AhoRequestRejectReason} from '../models/aho-request-reject-reason.model';

@Injectable()
export class AhoRequestsService {
  private requestTypes: AhoRequestType[];
  private requestStatuses: AhoRequestStatus[];
  private requestRejectReasons: AhoRequestRejectReason[];
  private requestTasksContent: AhoRequestTaskContent[];
  private employees: User[];
  private requests: AhoRequest[];
  private employeeRequests: AhoRequest[];
  private needs: IAhoRequestNeed[];
  private selectedRequest: AhoRequest | null;
  private newRequestsCount: number;
  private fetchingDataInProgress: boolean;
  private addRequestInProgress: boolean;
  private editRequestInProgress: boolean;
  private deleteRequestInProgress: boolean;
  private searchRequestsInProgress: boolean;
  private inEmployeeRequestsMode: boolean;
  private inShowCompletedRequestsMode: boolean;
  public filters_: FilterManager;
  private dataSource: MatTableDataSource<AhoRequest>;

  constructor(private readonly snackBar: MatSnackBar,
              private readonly authenticationService: AuthenticationService,
              private readonly ahoRequestResource: AhoRequestsResource,
              private readonly usersService: UsersService,
              private readonly showCompletedRequestsPipe: ShowCompletedRequestsPipe) {
    this.requestTypes = [];
    this.requestStatuses = [];
    this.requestRejectReasons = [];
    this.requestTasksContent = [];
    this.employees = [];
    this.requests = [];
    this.employeeRequests = [];
    this.needs = [];
    this.selectedRequest = null;
    this.newRequestsCount = 0;
    this.addRequestInProgress = false;
    this.editRequestInProgress = false;
    this.deleteRequestInProgress = false;
    this.searchRequestsInProgress = false;
    this.fetchingDataInProgress = false;
    this.inEmployeeRequestsMode = false;
    this.inShowCompletedRequestsMode = false;
    this.filters_ = new FilterManager();
    this.filters_.addFilter(new AhoRequestFilter<Date>('startDate'));
    this.filters_.addFilter(new AhoRequestFilter<Date>('endDate'));
    this.filters_.addFilter(new AhoRequestFilter<AhoRequestType>('requestType'));
    this.filters_.addFilter(new AhoRequestFilter<AhoRequestStatus>('requestStatus'));
    this.filters_.addFilter(new AhoRequestFilter<User>('requestEmployee'));
    this.dataSource = new MatTableDataSource<AhoRequest>(this.showCompletedRequestsPipe.transform(this.requests, this.inShowCompletedRequestsMode));
  }

  /**
   * Получение всех заявок с сервера
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequests(
    start: number,
    end: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number
  ): Promise<AhoRequest[] | null> {
    try {
      this.fetchingDataInProgress = true;
      this.inEmployeeRequestsMode = false;
      const result = await this.ahoRequestResource.getRequests(
        {
          start: start,
          end: end,
          employeeId: employeeId,
          requestTypeId: requestTypeId,
          requestStatusId: requestStatusId
        },
        null,
        null
      );
      if (result) {
        this.fetchingDataInProgress = false;
        this.requests = [];
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          request.backup.setup(['tasks', 'employees', 'rejectReason']);
          this.requests.push(request);
          if (request.status.id === 1) {
            this.newRequestsCount += 1;
          }
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(
          this.showCompletedRequestsPipe.transform(this.requests, this.inShowCompletedRequestsMode)
        );
        return this.requests;
      }
    } catch (error) {
      console.error(error);
      this.fetchingDataInProgress = false;
      return null;
    }
  }

  /**
   * Экспорт заявок в Excel
   * @param {number} start - Дата начала периода
   * @param {number} end - Дата окончания периода
   * @param {number} employeeId - Идентификатор исполнителя
   * @param {number} requestTypeId - Идентификатор типа заявки
   * @param {number} requestStatusId - Идентификатор статуса заявки
   * @returns {Promise<string | null>}
   */
  async fetchRequestsExport(
    start: number,
    end: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number
  ): Promise<string | null> {
    try {
      this.fetchingDataInProgress = true;
      const result  = await this.ahoRequestResource.getRequestsExport({
        start: start,
        end: end,
        employeeId: employeeId,
        requestTypeId: requestTypeId,
        requestStatusId: requestStatusId
      });
      if (result) {
        this.fetchingDataInProgress = false;
        saver.saveAs(result, 'export.xlsx');
      }
    } catch (error) {
      console.error(error);
      this.fetchingDataInProgress = false;
      return null;
    }
  }

  /**
   * Поиск заявок
   * @param {string} search - Условие поиска
   * @returns {Promise<AhoRequest[] | null>}
   */
  async searchRequests(search: string): Promise<AhoRequest[] | null> {
    try {
      this.filters_.resetFilters();
      this.fetchingDataInProgress = true;
      const result = await this.ahoRequestResource.getRequests(
        {
          start: 0,
          end: 0,
          employeeId: 0,
          requestTypeId: 0,
          requestStatusId: 0,
          search: search
        },
        null,
        null
      );
      if (result) {
        this.fetchingDataInProgress = false;
        this.inEmployeeRequestsMode = false;
        this.requests = [];
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          this.requests.push(request);
          if (request.status.id === 1) {
            this.newRequestsCount += 1;
          }
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        return this.requests;
      }
    } catch (error) {
      console.error(error);
      this.fetchingDataInProgress = false;
      return null;
    }
  }

  /**
   * Получение всех заявок с заданным статусом
   * @param {number} id - Идентификатор статуса заявки
   * @returns {Promise<AhoRequest[] | null>}
   */
  // TODO - Unused method
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
      const result = await this.ahoRequestResource.getRequests({start: 0, end: 0, employeeId: id, requestTypeId: 0, requestStatusId: 0});
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
   * Получение причин отклоенния заявок АХО с сервера
   * @returns {Promise<IAhoRequestRejectReason[] | null>}
   */
  async fetchRequestRejectReasons(): Promise<IAhoRequestRejectReason[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequestRejectReasons();
      if (result) {
        result.forEach((item: IAhoRequestRejectReason) => {
          const rejectReason = new AhoRequestRejectReason(item);
          this.requestRejectReasons.push(rejectReason);
        });
        return this.requestRejectReasons;
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
        return this.needs;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Экспорт потребностей в материалах в Excel
   * @returns {Promise<any>}
   */
  async fetchNeedsExport(): Promise<any> {
    try {
      this.fetchingDataInProgress = true;
      const result = await this.ahoRequestResource.exportNeeds();
      this.fetchingDataInProgress = false;
      saver.saveAs(result, 'needs.xlsx');
    } catch (error) {
      this.fetchingDataInProgress = false;
      console.error(error);
      return null;
    }
  }

  /**
   * Получение списка загруженных заявок
   * @returns {AhoRequest[]}
   */
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

  getUnfinishedEmployeeRequests(): AhoRequest[] {
    const result = [];
    this.employeeRequests.forEach((request: AhoRequest) => {
      if (request.status.id === 2) {
        result.push(request);
      }
    });
    return result;
  }

  showAllRequests() {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
    this.inEmployeeRequestsMode = false;
    this.filters_.resetFilters();
    this.fetchRequests(0, 0, 0, 0, 0);
  }

  showEmployeeRequests() {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.employeeRequests);
    this.inEmployeeRequestsMode = true;
    this.filters_.resetFilters();
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
      this.editRequestInProgress = true;
      const result = await this.ahoRequestResource.editRequest(request, null, {id: request.id});
      this.editRequestInProgress = false;
      const request_ = new AhoRequest(result);
      const findEmployeeById = (empl: User) => empl.id === this.authenticationService.getCurrentUser().id;
      const employee = request_.employees.find(findEmployeeById);
      if (employee) {
        this.employeeRequests.push(request_);
      }
      this.snackBar.open(`Изменения в заявке #${request.id} сохранены`, 'Закрыть', {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 3000
      });
      this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
      return request_;
    } catch (error) {
      console.error(error);
      this.editRequestInProgress = false;
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
   * Поиск сотрудника по идентификатору
   * @param {number} id - Идентификатор сотрудника
   * @returns {User | null}
   */
  getEmployeeById(id: number): User | null {
    const findEmployeeById = (employee: User) => employee.id === id;
    const result = this.employees.find(findEmployeeById);
    return result ? result : null;
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
   * Выполняется ли загрузка данных
   * @returns {boolean}
   */
  isFetchingData(): boolean {
    return this.fetchingDataInProgress;
  }

  /**
   * Выполняется ли добавление новой заявки
   * @returns {boolean}
   */
  isAddingRequest(): boolean {
    return this.addRequestInProgress;
  }

  /**
   * Выполняется ли изменение заявки
   * @returns {boolean}
   */
  isEditingRequest(): boolean {
    return this.editRequestInProgress;
  }

  /**
   * Выполняется ли удаление заявки
   * @returns {boolean}
   */
  isDeletingRequest(): boolean {
    return this.deleteRequestInProgress;
  }

  /**
   * Выполняется ли поиск заявко
   * @returns {boolean}
   */
  isSearchingRequests(): boolean {
    return this.searchRequestsInProgress;
  }

  /**
   * Находится ли приложени в режиме показа заявок исполнителя
   * @returns {boolean}
   */
  isInEmployeeRequestsMode(): boolean {
    return this.inEmployeeRequestsMode;
  }

  isInShowCompletedRequestsMode(): boolean {
    return this.inShowCompletedRequestsMode;
  }

  showCompletedRequests(value: boolean) {
    console.log(value);
    const requests = this.showCompletedRequestsPipe.transform(this.requests, value);
    console.log(requests);
    this.dataSource = new MatTableDataSource<AhoRequest>(requests);
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


  /**
   * Получение списка причир отклонения заявки
   * @returns {AhoRequestRejectReason[]}
   */
  getRequestRejectReasons(): AhoRequestRejectReason[] {
    return this.requestRejectReasons;
  }

}
