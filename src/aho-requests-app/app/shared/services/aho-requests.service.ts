import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AhoRequestsResource } from '../resources/aho-requests.resource';
import { AhoRequestType } from '../models/aho-request-type.model';
import { IAhoRequestType } from '../interfaces/aho-request-type.interface';
import { AhoRequest } from '../models/aho-request.model';
import { IAhoRequest } from '../interfaces/aho-request.interface';
import { IAddAhoRequest } from '../interfaces/aho-request.add.interface';

@Injectable()
export class AhoRequestsService {
  private requestTypes: AhoRequestType[];
  private requests: AhoRequest[];
  private selectedRequest: AhoRequest | null;
  private addRequestInProgress: boolean;

  constructor(private readonly snackBar: MatSnackBar,
              private readonly ahoRequestResource: AhoRequestsResource) {
    this.requestTypes = [];
    this.requests = [];
    this.selectedRequest = null;
    this.addRequestInProgress = false;
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
        });
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
        this.requests.push(newRequest);
        this.snackBar.open(`Ваша заявка добавлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        return newRequest;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
