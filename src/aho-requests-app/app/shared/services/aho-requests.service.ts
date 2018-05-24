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

@Injectable()
export class AhoRequestsService {
  private requestTypes: AhoRequestType[];
  private requestStatuses: AhoRequestStatus[];
  private requests: AhoRequest[];
  private selectedRequest: AhoRequest | null;
  private newRequestsCount: number;
  private addRequestInProgress: boolean;
  private dataSource: MatTableDataSource<AhoRequest>;

  constructor(private readonly snackBar: MatSnackBar,
              private readonly ahoRequestResource: AhoRequestsResource) {
    this.requestTypes = [];
    this.requestStatuses = [];
    this.requests = [];
    this.selectedRequest = null;
    this.newRequestsCount = 0;
    this.addRequestInProgress = false;
    this.dataSource = new MatTableDataSource<AhoRequest>(this.requests);
  }

  /**
   * Статус добавления заявки
   * @returns {boolean}
   */
  isAddingRequest(): boolean {
    return this.addRequestInProgress;
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

  /**
   * Устанавливает текущую заявку
   * @param {AhoRequest | null} request
   */
  setSelectedRequest(request: AhoRequest | null) {
   this.selectedRequest = request;
  }

  /**
   * Получение всех заявок с сервера
   * @returns {Promise<AhoRequest[] | null>}
   */
  async fetchRequests(): Promise<AhoRequest[] | null> {
    try {
      const result = await this.ahoRequestResource.getRequests();
      if (result) {
        result.forEach((item: IAhoRequest) => {
          const request = new AhoRequest(item);
          this.requests.push(request);
          if (request.status.id === 1) {
            this.newRequestsCount += 1;
          }
        });
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


  getRequests(): AhoRequest[] {
    return this.requests;
  }


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
   * Возвращает все типы заявок АХО
   * @returns {AhoRequestType[]}
   */
  getRequestTypes(): AhoRequestType[] {
    return this.requestTypes;
  }

  /**
   * Поиск типа заявки по идентификатору типа
   * @param {number} id - Идентификатор типа заявки
   * @returns {AhoRequestType | null}
   */
  getRequestTypeById(id: number): AhoRequestType | null {
    let result: AhoRequestType | null = null;
    this.requestTypes.forEach((requestType: AhoRequestType) => {
      if (requestType.id === id) {
        result = requestType;
      }
    });
    return result;
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
      this.addRequestInProgress = false;
      if (result) {
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
      return null;
    }
  }

}
