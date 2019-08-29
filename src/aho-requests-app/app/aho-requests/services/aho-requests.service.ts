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
import { IServerResponse, IUser, IRole,  User, UsersService, AuthenticationService, Pagination } from '@kolenergo/cpa';
import { AhoRequestComment } from '../models/aho-request-comment.model';
import { IAhoRequestComment } from '../interfaces/aho-request-comment.interface';
import { IAhoRequestNeed } from '../interfaces/aho-request-need.interface';
import { AhoRequestFilter } from '../models/aho-request-filter.model';
import { FilterManager } from '../models/filter-manager.model';
import { ShowCompletedRequestsPipe } from '../pipes/show-completed-requests.pipe';
import * as saver from 'file-saver';
import { IAhoRequestRejectReason } from '../interfaces/aho-request-reject-reason.interface';
import { AhoRequestRejectReason } from '../models/aho-request-reject-reason.model';
import { environment } from '../../../environments/environment';
import { IAhoServerResponse } from '../interfaces/aho-server-response.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IAhoRequestsInitialData } from '../interfaces/aho-requests-initial-data.interface';
import {TabsManager} from '../models/tabs-manager.model';
import {Tab} from '../models/tab.model';

@Injectable()
export class AhoRequestsService {
  private pagination: Pagination;
  private requestTypes: AhoRequestType[];
  private requestStatuses: AhoRequestStatus[];
  private requestRejectReasons: AhoRequestRejectReason[];
  private requestTasksContent: AhoRequestTaskContent[];
  private employees: User[];
  private requests: AhoRequest[];
  public totalRequestsCount: number;
  public ownRequestsCount: number;
  private expiredRequestsCount: number;
  private employeeRequestsCount: number;
  private employeeRequests: AhoRequest[];
  public search: string;
  private needs: IAhoRequestNeed[];
  private selectedRequest: AhoRequest | null;
  private newRequestsCount: number;
  private addRequestInProgress: boolean;
  private editRequestInProgress: boolean;
  private deleteRequestInProgress: boolean;
  private rejectRequestInProgress: boolean;
  private resumeRequestInProgress: boolean;
  private searchRequestsInProgress: boolean;
  private cancelRequestInProgress: BehaviorSubject<boolean>;
  private inEmployeeRequestsMode: boolean;
  private inExpiredRequestsMode: boolean;
  private inShowCompletedRequestsMode: boolean;
  public filters_: FilterManager;
  private dataSource: MatTableDataSource<AhoRequest>;

  public mode$: BehaviorSubject<string>;
  private requests$: BehaviorSubject<AhoRequest[]>;
  private fetchingData$: BehaviorSubject<boolean>;
  private allRequestsCount$: BehaviorSubject<number>;
  private allRequestsNewCount$: BehaviorSubject<number>;
  private ownRequestsCount$: BehaviorSubject<number>;
  private ownRequestsUncompletedCount$: BehaviorSubject<number>;
  private employeeRequestsCount$: BehaviorSubject<number>;
  private employeeRequestsUncompletedCount$: BehaviorSubject<number>;
  private expiredRequestsCount$: BehaviorSubject<number>;



  constructor(private readonly snackBar: MatSnackBar,
              private readonly auth: AuthenticationService,
              private readonly ahoRequestResource: AhoRequestsResource,
              private readonly usersService: UsersService,
              private readonly showCompletedRequestsPipe: ShowCompletedRequestsPipe) {
    this.totalRequestsCount = 0;
    this.ownRequestsCount = 0;
    this.expiredRequestsCount = 0;

    this.employeeRequestsCount = 0;

    this.pagination = new Pagination();
    this.requestTypes = [];
    this.requestStatuses = [];
    this.requestRejectReasons = [];
    this.requestTasksContent = [];
    this.employees = [];
    this.requests = [];
    this.employeeRequests = [];
    this.needs = [];
    this.search = null;
    this.selectedRequest = null;
    this.newRequestsCount = 0;
    this.addRequestInProgress = false;
    this.editRequestInProgress = false;
    this.deleteRequestInProgress = false;
    this.rejectRequestInProgress = false;
    this.resumeRequestInProgress = false;
    this.cancelRequestInProgress = new BehaviorSubject<boolean>(false);
    this.searchRequestsInProgress = false;

    this.inEmployeeRequestsMode = false;
    this.inExpiredRequestsMode = false;
    this.inShowCompletedRequestsMode = true;
    this.filters_ = new FilterManager();
    this.filters_.addFilter(new AhoRequestFilter<Date>('startDate'));
    this.filters_.addFilter(new AhoRequestFilter<Date>('endDate'));
    this.filters_.addFilter(new AhoRequestFilter<AhoRequestType>('requestType'));
    this.filters_.addFilter(new AhoRequestFilter<AhoRequestStatus>('requestStatus'));
    this.filters_.addFilter(new AhoRequestFilter<User>('requestEmployee'));
    this.dataSource =
      new MatTableDataSource<AhoRequest>(this.showCompletedRequestsPipe.transform(this.requests, this.inShowCompletedRequestsMode));


    this.mode$ = new BehaviorSubject<string>(null);
    this.requests$ = new BehaviorSubject<AhoRequest[]>([]);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.allRequestsCount$ = new BehaviorSubject<number>(0);
    this.allRequestsNewCount$ = new BehaviorSubject<number>(0);
    this.ownRequestsCount$ = new BehaviorSubject<number>(0);
    this.ownRequestsUncompletedCount$ = new BehaviorSubject<number>(0);
    this.employeeRequestsCount$ = new BehaviorSubject<number>(0);
    this.employeeRequestsUncompletedCount$ = new BehaviorSubject<number>(0);
    this.expiredRequestsCount$ = new BehaviorSubject<number>(0);

  }


  /**
   * Получение с сервера данных для инициализации приложения
   * @param userId - Идентификатор пользователя
   * @param itemsOnPage - Количество заявок на странице
   */
  async fetchInitialData(userId: number, itemsOnPage: number): Promise<IServerResponse<IAhoRequestsInitialData> | null> {
    try {
      this.fetchingData$.next(true);
      this.requests = [];
      const result: IServerResponse<IAhoRequestsInitialData> = await this.ahoRequestResource.getInitialData({
        userId: userId,
        itemsOnPage: itemsOnPage
      });
      if (result) {
        if (this.requestTypes.length === 0) {
          result.data.types.forEach((item: IAhoRequestType) => {
            const type = new AhoRequestType(item);
            this.requestTypes.push(type);
          });
        }
        if (this.requestStatuses.length === 0) {
          result.data.statuses.forEach((item: IAhoRequestStatus) => {
            const status = new AhoRequestStatus(item);
            this.requestStatuses.push(status);
          });
        }
        if (this.requestTasksContent.length === 0) {
          result.data.tasks.forEach((item: IAhoRequestTaskContent) => {
            const content = new AhoRequestTaskContent(item);
            this.requestTasksContent.push(content);
          });
        }
        if (this.requestRejectReasons.length === 0) {
          result.data.rejectReasons.forEach((item: IAhoRequestRejectReason) => {
            const reason = new AhoRequestRejectReason(item);
            this.requestRejectReasons.push(reason);
          });
        }
        if (this.employees.length === 0) {
          result.data.employees.forEach((item: IUser) => {
            const employee = new User(item);
            this.employees.push(employee);
          });
        }
        if (this.requests.length === 0) {
          const requests = [];
          result.data.requests.forEach((item: IAhoRequest) => {
            const request = new AhoRequest(item);
            request.backup.setup(['tasks', 'employees', 'status', 'rejectReason', 'comments', 'dateExpires']);
            requests.push(request);
            this.requests.push(request);
          });
          this.requests$.next(requests);
          /*
          this.dataSource = new MatTableDataSource<AhoRequest>(
            this.showCompletedRequestsPipe.transform(this.requests, this.inShowCompletedRequestsMode)
          );
          */
          this.dataSource = new MatTableDataSource<AhoRequest>(
            this.showCompletedRequestsPipe.transform(this.requests$.getValue(), this.inShowCompletedRequestsMode)
          );
        }
        this.ownRequestsCount = result.data.ownRequests;
        this.employeeRequestsCount = result.data.employeeRequests;
        this.expiredRequestsCount = result.data.expiredRequests;
        this.totalRequestsCount = result.data.totalRequests;
        console.log('employeeRequestsCount', this.employeeRequestsCount);
        console.log('expiredRequestsCount', this.expiredRequestsCount);
        console.log('totalRequestsCount', this.totalRequestsCount);
        this.fetchingData$.next(false);
        this.pagination = new Pagination({
          totalItems: this.totalRequestsCount,
          itemsOnPage: environment.settings.requestsOnPage
        });
        console.log('pagination', this.pagination);


        this.allRequestsCount$.next(result.data.allRequests.totalRequestsCount);
        this.allRequestsNewCount$.next(result.data.allRequests.newRequestsCount);
        this.ownRequestsCount$.next(result.data.ownRequests_.totalRequestsCount);
        this.ownRequestsUncompletedCount$.next(result.data.ownRequests_.uncompletedRequestsCount);
        this.employeeRequestsCount$.next(result.data.employeeRequests_.totalRequestsCount);
        this.employeeRequestsUncompletedCount$.next(result.data.employeeRequests_.uncompletedRequestsCount);
        this.expiredRequestsCount$.next(result.data.expiredRequests_.totalRequestsCount);
        if (result.data.allRequests.totalRequestsCount > 0) {
          this.mode$.next('all-requests-mode');
        } else if (result.data.ownRequests_.totalRequestsCount > 0) {
          this.mode$.next('own-requests-mode');
        } else if (result.data.employeeRequests_.totalRequestsCount > 0) {
          this.mode$.next('employee-requests-mode');
        } else if (result.data.expiredRequests_.totalRequestsCount > 0 ) {
          this.mode$.next('expired-requests-mode');
        }
      }
      return result;
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
  }

  /**
   * Получение всех заявок с сервера
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequests(
    start: number,
    end: number,
    userId: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number,
    onlyExpired: boolean = false,
    page: number = this.pagination.currentPage,
    itemsOnPage: number = environment.settings.requestsOnPage,
    clear?: boolean
  ): Promise<AhoRequest[] | null> {
    try {
      this.fetchingData$.next(true);
      if (clear && clear === true) {
        this.requests = [];
      }
      const result = await this.ahoRequestResource.getRequests(
        {
          start: start,
          end: end,
          userId: userId,
          employeeId: employeeId,
          requestTypeId: requestTypeId,
          requestStatusId: requestStatusId,
          onlyExpired: onlyExpired,
          page: page,
          itemsOnPage: itemsOnPage
        },
        null,
        null
      );
      if (result) {
        this.fetchingData$.next(false);
        this.totalRequestsCount = result.data.totalRequests;
        this.pagination = new Pagination({
          totalItems: result.data.totalRequests,
          itemsOnPage: environment.settings.requestsOnPage
        });
        this.pagination.setPage(page);
        console.log('pagination', this.pagination);
        result.data.requests.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          request.backup.setup(['status', 'tasks', 'employees', 'rejectReason', 'dateExpires']);
          this.requests.push(request);
          this.newRequestsCount += request.status.id === 1 ? 1 : 0;
        });
        console.log('show completed requests', this.inShowCompletedRequestsMode);
        this.dataSource =
          new MatTableDataSource<AhoRequest>(this.showCompletedRequestsPipe.transform(this.requests, this.inShowCompletedRequestsMode));
        return this.requests;
      }
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
  }


  /**
   * Получение заявок исполнителя
   * @param employeeId - Идентификатор исполнителя
   */
  async fetchEmployeeRequests(employeeId: number): Promise<AhoRequest[] | null> {
    // this.filters_.getFilterByTitle('requestEmployee').setValue(this.auth.getCurrentUser());
    console.log('current user id = ', employeeId);
    try {
      this.fetchingData$.next(true);
      this.mode$.next('employee-requests-mode');
      this.inExpiredRequestsMode = false;
      this.search = null;
      const result = await this.fetchRequests(
        0,
        0,
        0,
        employeeId,
        0,
        0,
        false,
        0,
        environment.settings.requestsOnPage,
        true,
      );
      this.fetchingData$.next(false);
      this.inEmployeeRequestsMode = true;
      return this.requests;
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
  }

  /**
   * Получение просроченных заявок
   * @param employeeId - Идентификатор сотрудника
   */
  async fetchExpiredRequests(employeeId: number = 0): Promise<AhoRequest[] | null> {
    try {
      this.fetchingData$.next(true);
      this.mode$.next('expired-requests-mode');
      this.inExpiredRequestsMode = true;
      this.search = null;
      const result = await this.fetchRequests(
        0,
        0,
        0,
        employeeId,
        0,
        0,
        true,
        0,
        environment.settings.requestsOnPage,
        true,
      );
      this.fetchingData$.next(false);
      this.inEmployeeRequestsMode = true;
      return this.requests;
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
  }

  /**
   * Получение следующей страницы заявок с сервера
   * @param start - Дата начала периода
   * @param end  - Дата окончания периода
   * @param employeeId - Идентификатор сотрудника
   * @param requestTypeId - Идентификатор типа заявки
   * @param requestStatusId - Идентификатор статуса заявки
   */
  async fetchNextPage(
    start: number,
    end: number,
    userId: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number): Promise<AhoRequest[] | null> {
    this.pagination.nextPage();
    const result = await this.fetchRequests(
      start,
      end,
      userId,
      employeeId,
      requestTypeId,
      requestStatusId,
      false,
      this.pagination.currentPage,
      this.pagination.itemsOnPage
    );
    return result;
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
    userId: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number
  ): Promise<string | null> {
    try {
      this.fetchingData$.next(true);
      const result  = await this.ahoRequestResource.getRequestsExport({
        start: start,
        end: end,
        userId: userId,
        employeeId: employeeId,
        requestTypeId: requestTypeId,
        requestStatusId: requestStatusId
      });
      if (result) {
        this.fetchingData$.next(false);
        saver.saveAs(result, 'export.xlsx');
      }
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
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
      this.fetchingData$.next(true);
      const result = await this.ahoRequestResource.getRequests(
        {
          start: 0,
          end: 0,
          userId: this.auth.getCurrentUser().id,
          employeeId: 0,
          requestTypeId: 0,
          requestStatusId: 0,
          page: 0,
          onlyExpired: false,
          itemsOnPage: 0,
          search: search
        },
        null,
        null
      );
      if (result) {
        this.mode$.next('search-requests-mode');
        this.inEmployeeRequestsMode = false;
        this.inExpiredRequestsMode = false;
        this.totalRequestsCount = result.data.totalRequests;
        this.pagination = new Pagination({
          itemsOnPage: environment.settings.requestsOnPage,
          totalItems: result.data.totalRequests
        });
        // this.requests = [];
        const requests = [];
        result.data.requests.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          requests.push(request);
          if (request.status.id === 1) {
            this.newRequestsCount += 1;
          }
        });
        // if (requests.length > 0) {
          this.requests$.next(requests);
          this.dataSource = new MatTableDataSource<AhoRequest>(this.requests$.getValue());
          this.fetchingData$.next(false);
          this.mode$.next('search-requests-mode');
        // }
        // this.requests$.next(requests);
        // this.dataSource = new MatTableDataSource<AhoRequest>(this.requests$.getValue());
        return requests;
      }
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
  }

  /**
   * Очистка результатов поиска
   */
  async cancelSearch() {
    this.search = null;
    await this.fetchRequests(
      0,
      0,
      this.auth.getCurrentUser().permissions.getRoleById(1) ? 0 : this.auth.getCurrentUser().id,
      0,
      0,
      0,
      false,
      0,
      environment.settings.requestsOnPage,
      true
    );
    if (this.auth.getCurrentUser().permissions.getRoleById(1)) {
      this.mode$.next('all-requests-mode');
    } else if (this.ownRequestsCount$.getValue() > 0) {
      this.mode$.next('own-requests-mode');
    } else if (this.employeeRequestsCount$.getValue() > 0) {
      this.mode$.next('employee-requests-mode');
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
   * Получение заявки по идентификатору
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
   * Экспорт заявки в Excel
   * @param requestId - Идентификатор заявки
   */
  async fetchRequestExport(requestId: number): Promise<string | null> {
    try {
      this.fetchingData$.next(true);
      const result  = await this.ahoRequestResource.getRequestExport({id: requestId});
      if (result) {
        this.fetchingData$.next(false);
        saver.saveAs(result, `${requestId}.xlsx`);
      }
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
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
      this.fetchingData$.next(true);
      const result = await this.ahoRequestResource.exportNeeds();
      this.fetchingData$.next(false);
      saver.saveAs(result, 'needs.xlsx');
    } catch (error) {
      this.fetchingData$.next(false);
      console.error(error);
      return null;
    }
  }

  /**
   * Добавление новой заявки
   * @param {IAddAhoRequest} request - Добавляемая заявка
   * @returns {Promise<IAhoRequest | null>}
   */
  async addRequest(request: IAddAhoRequest): Promise<IAhoRequest | null> {
    try {
      this.addRequestInProgress = true;
      if (request.dateExpires) {
        request.dateExpires.setHours(23, 59, 59, 59);
      }
      const result = await this.ahoRequestResource.addRequest(request);
      if (result) {
        this.addRequestInProgress = false;
        const newRequest = new AhoRequest(result);
        this.requests.unshift(newRequest);
        if (this.mode$.getValue() !== 'own-requests-mode') {
          this.ownRequestsCount$.next(this.ownRequestsCount$.getValue() + 1);
          this.ownRequestsUncompletedCount$.next(this.ownRequestsUncompletedCount$.getValue() + 1);
          this.showOwnRequests();
        }
        this.allRequestsNewCount$.next(this.allRequestsNewCount$.getValue() + 1);
        this.newRequestsCount += 1;
        this.totalRequestsCount++;
        this.snackBar.open(`Ваша заявка добавлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        newRequest.getTasksContent().forEach((content: AhoRequestTaskContent) => {
          const findTaskContentById = (item: AhoRequestTaskContent) => item.id === content.id;
          const taskContent = this.requestTasksContent.find(findTaskContentById);
          if (!taskContent) {
            this.requestTasksContent.push(content);
          }
        });
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
  async editRequest(request: AhoRequest): Promise<AhoRequest | null> {
    try {
      this.editRequestInProgress = true;
      const result = await this.ahoRequestResource.editRequest(request, null, {id: request.id});
      this.editRequestInProgress = false;
      const request_ = new AhoRequest(result);
      request.fromAnother(request_);
      request.backup.setup(['status', 'employees', 'tasks', 'rejectReason', 'dateExpires']);
      const findEmployeeById = (empl: User) => empl.id === this.auth.getCurrentUser().id;
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
   * Изменение статуса заявки
   * @param request - Заявка АХО
   * @param status - Статус заявки АХО
   */
  async setRequestStatus(request: AhoRequest, status: AhoRequestStatus): Promise<AhoRequest | null> {
    try {
      this.editRequestInProgress = true;
      const result = await this.ahoRequestResource.setRequestStatus({request: request, status: status});
      this.editRequestInProgress = false;
      if (result) {
        request.status = status;
        request.backup.setup(['status', 'employees', 'tasks', 'rejectReason', 'dateExpires']);
        this.snackBar.open(`Статус заявки #${request.id} изменен`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        return new AhoRequest(result);
      }
      return null;
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
      this.deleteRequestInProgress = true;
      const result = await this.ahoRequestResource.deleteRequest({id: requestId});
      this.deleteRequestInProgress = false;
      if (result === true) {
        const requests = this.requests$.getValue().slice();
        requests.forEach((request: AhoRequest, index: number) => {
          if (request.id === requestId) {
            if (request.user.id === this.auth.getCurrentUser().id) {
              this.ownRequestsCount$.next(this.ownRequestsCount$.getValue() - 1);
              if (request.status.id === 1) {
                this.ownRequestsUncompletedCount$.next(this.ownRequestsUncompletedCount$.getValue() - 1);
              }
            }
            if (request.status.id === 1) {
              this.allRequestsNewCount$.next(this.allRequestsNewCount$.getValue() - 1);
            }
            requests.splice(index, 1);
          }
        });
        this.snackBar.open(`Заявка #${requestId} удалена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        // this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
        this.requests$.next(requests);
        this.dataSource = new MatTableDataSource<AhoRequest>(this.requests$.getValue());
        if (this.ownRequestsCount$.getValue() === 0 && this.mode$.getValue() === 'own-requests-mode') {
          if (this.allRequestsCount$.getValue() > 0) {
            this.mode$.next('all-requests-mode');
          } else if (this.employeeRequestsCount$.getValue() > 0) {
            this.mode$.next('employee-requests-mode');
          }
        }
        return true;
      }
    } catch (error) {
      console.error(error);
      this.deleteRequestInProgress = false;
      return false;
    }
  }

  /**
   * Отклонение заявки АХО
   * @param {AhoRequest} request - Отклоняемая заявка
   * @returns {Promise<boolean>}
   */
  async rejectRequest(request: AhoRequest): Promise<boolean> {
    try {
      this.rejectRequestInProgress = true;
      const result = await this.ahoRequestResource.rejectRequest(request);
      this.rejectRequestInProgress = false;
      if (result) {
        const req_ = new AhoRequest(result);
        request.fromAnother(req_);
        request.backup.setup(['status', 'tasks', 'employees', 'rejectReason']);
        this.snackBar.open(`Заявка #${request.id} отклонена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      this.rejectRequestInProgress = false;
      return false;
    }
  }

  /**
   * Возобновление заявки АХО
   * @param request (AhoRequest) - Заявка АХО
   * @returns {Promise<boolean>}
   */
  async resumeRequest(request: AhoRequest): Promise<boolean> {
    try {
      this.resumeRequestInProgress = true;
      const result = await this.ahoRequestResource.resumeRequest(request);
      this.resumeRequestInProgress = false;
      if (result) {
        const request_ = new AhoRequest(result);
        request.fromAnother(request_);
        request.backup.setup(['status', 'tasks', 'employees', 'rejectReason', 'dateExpires']);
        this.snackBar.open(`Заявка #${request.id} возобновлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      this.resumeRequestInProgress = false;
      return false;
    }
  }

  /**
   * Отмена заявки АХО
   * @param request - Заявка АХО
   */
  async cancelRequest(request: AhoRequest): Promise<boolean> {
    try {
      this.cancelRequestInProgress.next(true);
      const result = await this.ahoRequestResource.cancelRequest(request);
      this.cancelRequestInProgress.next(false);
      if (result) {
        const status = this.getRequestStatusById(5);
        request.status = status;
        request.backup.setup(['status', 'tasks', 'employees', 'rejectReason', 'dateExpires']);
        this.snackBar.open(`Заявка #${request.id} отменена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      this.cancelRequestInProgress.next(false);
      return false;
    }
  }

  /**
   * Добавление причины отклонения зааявки
   * @param rejectReason - Причина отклоенния заявки
   */
  async addRejectReason(rejectReason: AhoRequestRejectReason): Promise<AhoRequestRejectReason | null> {
    try {
      const result = await this.ahoRequestResource.addRejectReason(rejectReason);
      if (result) {
        const reason = new AhoRequestRejectReason(result);
        this.requestRejectReasons.push(reason);
        return reason;
      }
    } catch (error) {
      console.error(error);
      this.rejectRequestInProgress = false;
      return null;
    }
  }

  /**
   * Выполняется ли возобновление заявки
   * @returns {boolean}
   */
  isResumingRequest(): boolean {
    return this.resumeRequestInProgress;
  }

  /**
   * Выполняется ли отклонение заявки
   * @returns {boolean}
   */
  isRejectingRequest(): boolean {
    return this.rejectRequestInProgress;
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
  isFetchingData(): Observable<boolean> {
    return this.fetchingData$.asObservable();
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
   * Выполняется ли отмена заявки
   * @returns {Observable<boolean>}
   */
  isCancelingRequest(): Observable<boolean> {
    return this.cancelRequestInProgress.asObservable();
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

  /**
   * Находится ли приложение в режиме показа просроченных заявок
   */
  isInShowExpiredRequestsMode(): boolean {
    return this.inExpiredRequestsMode;
  }

  showCompletedRequests(value: boolean) {
    this.inShowCompletedRequestsMode = value;
    this.dataSource = new MatTableDataSource<AhoRequest>(this.showCompletedRequestsPipe.transform(this.requests, value));
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
    this.mode$.next('all-requests-mode');
    this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
    this.inEmployeeRequestsMode = false;
    this.inExpiredRequestsMode = false;
    this.search = null;
    this.filters_.resetFilters();
    this.fetchRequests(
      0,
      0,
      this.ownRequestsCount > 0 ? this.auth.getCurrentUser().id : 0,
      this.ownRequestsCount === 0 && this.employeeRequestsCount > 0 ? this.auth.getCurrentUser().id : 0,
      0,
      0,
      false,
      0,
      environment.settings.requestsOnPage,
      true
    );
  }

  showEmployeeRequests() {
    this.dataSource = new MatTableDataSource<AhoRequest>(this.employeeRequests);
    this.inEmployeeRequestsMode = true;
    this.filters_.resetFilters();
  }

  /**
   * Является ли пользователь сотрудником
   */
  isUserIsEmployee(): boolean {
    if (this.auth.getCurrentUser()) {
      let result = false;
      this.auth.getCurrentUser().permissions.roles.forEach((role: IRole) => {
        if ((role.id === 2 && role.isEnabled) ||
          (role.id === 3 && role.isEnabled) ||
          (role.id === 4 && role.isEnabled) ||
          (role.id === 5 && role.isEnabled) ||
          (role.id === 6 && role.isEnabled)) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    }
    return false;
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
   * Получение списка причир отклонения заявки
   * @returns {AhoRequestRejectReason[]}
   */
  getRequestRejectReasons(): AhoRequestRejectReason[] {
    return this.requestRejectReasons;
  }

  getPagination(): Pagination {
    return this.pagination;
  }

  getEmployeeRequestsCount(): number {
    return this.employeeRequestsCount;
  }

  getExpiredRequestsCount(): number {
    return this.expiredRequestsCount;
  }

  getRequests_(): Observable<AhoRequest[]> {
    return this.requests$.asObservable();
  }

  getMode(): Observable<string> {
    return this.mode$.asObservable();
  }

  getAllRequestsCount(): Observable<number> {
    return this.allRequestsCount$.asObservable();
  }

  getAllRequestsNewCount(): Observable<number> {
    return this.allRequestsNewCount$.asObservable();
  }

  getOwnRequestsCount(): Observable<number> {
    return this.ownRequestsCount$.asObservable();
  }

  getOwnRequestsUncompletedCount(): Observable<number> {
    return this.ownRequestsUncompletedCount$.asObservable();
  }

  getEmployeeRequestsCount_(): Observable<number> {
    return this.employeeRequestsCount$.asObservable();
  }

  getEmployeeRequestsUncompletedCount(): Observable<number> {
    return this.employeeRequestsUncompletedCount$.asObservable();
  }

  getExpiredRequestsCount_(): Observable<number> {
    return this.expiredRequestsCount$.asObservable();
  }

  showOwnRequests() {
    this.filters_.resetFilters();
    this.inEmployeeRequestsMode = false;
    this.mode$.next('own-requests-mode');
    this.fetchRequests(
      0,
      0,
      this.auth.getCurrentUser().id,
      0,
      0,
      0,
      false,
      0,
      environment.settings.requestsOnPage,
      true
    );
  }

}
