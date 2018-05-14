import { Injectable } from '@angular/core';
import { AhoRequestsResource } from '../resources/aho-requests.resource';
import { AhoRequestType } from '../models/aho-request-type.model';
import {IAhoRequestType} from '../interfaces/aho-request-type.interface';
import {AhoRequest} from '../models/aho-request.model';

@Injectable()
export class AhoRequestsService {
  private requestTypes: AhoRequestType[];
  private requests: AhoRequest[];

  constructor(private readonly ahoRequestResource: AhoRequestsResource) {
    this.requestTypes = [];
    this.requests = [
      new AhoRequest({
        id: 1,
        userId: 1,
        requestTypeId: 1,
        comment: 'Тестовая заявка АХО №1',
        dateCreated: new Date()
      }),
      new AhoRequest({
        id: 1,
        userId: 1,
        requestTypeId: 2,
        comment: 'Тестовая заявка АХО №2',
        dateCreated: new Date()
      }),
      new AhoRequest({
        id: 1,
        userId: 1,
        requestTypeId: 3,
        comment: 'Тестовая заявка АХО №3',
        dateCreated: new Date()
      })
    ];
  }

  getRequests(): AhoRequest[] {
    return this.requests;
  }

  /**
   * Возвращает все типы заявок АХО
   * @returns {AhoRequestType[]}
   */
  getRequestTypes(): AhoRequestType[] {
    return this.requestTypes;
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


}
