import { ChangeDetectorRef, Injectable } from '@angular/core';
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

  constructor(private readonly detector: ChangeDetectorRef,
              private readonly snackBar: MatSnackBar,
              private readonly ahoRequestResource: AhoRequestsResource) {
    this.requestTypes = [];
    this.requests = [];
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

  /**
   * Добавление новой заявки
   * @param {IAddAhoRequest} request - Добавляемая заявка
   * @returns {Promise<IAhoRequest | null>}
   */
  async addRequest(request: IAddAhoRequest): Promise<IAhoRequest | null> {
    try {
      const result = await this.ahoRequestResource.addRequest(request);
      if (result) {
        const newRequest = new AhoRequest(result);
        this.requests.push(newRequest);
        this.snackBar.open(`Заявка №${newRequest.id} добавлена`, 'Закрыть', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        });
        this.detector.detectChanges();
        return newRequest;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
