import { Injectable } from '@angular/core';
import { ApplicationsResource } from '../resources/applications.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { IApplication } from '../interfaces/application.interface';
import {finalize, map} from "rxjs/operators";
import { IServerResponse } from '@kolenergo/lib';



@Injectable()
export class ApplicationsService {
  private applications: BehaviorSubject<Application[]>;
  private fetchingData: BehaviorSubject<boolean>;

  constructor(private readonly resource: ApplicationsResource) {
    this.applications = new BehaviorSubject<Application[]>([]);
    this.fetchingData = new BehaviorSubject<boolean>(false);
  }

  /**
   * Получение списка приложений с сервера
   */
  fetchApplicationsList(): Observable<Application[]> {
    this.fetchingData.next(true);
    return from(this.resource.getAll())
      .pipe(
        map((data: IServerResponse<IApplication[]>) => {
          const result = [];
          data.data.forEach((item: IApplication) => {
            const application = new Application(item);
            result.push(application);
          });
          this.applications.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData.next(false);
        })
      );
  }

  /**
   * Возвращает список всех приложений
   */
  getApplicationsList(): Observable<Application[]> {
    return this.applications.asObservable();
  }

  /**
   * Выпорлняется ли получение данных с сервера
   */
  isFetchingData(): Observable<boolean> {
    return this.fetchingData.asObservable();
  }
}
