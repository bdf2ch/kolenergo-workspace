import { Injectable } from '@angular/core';
import { ApplicationsResource } from '../resources/applications.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { IApplication } from '../interfaces/application.interface';
import { map } from 'rxjs/operators';



@Injectable()
export class ApplicationsService {
  private applications: BehaviorSubject<Application[]>;

  constructor(private readonly resource: ApplicationsResource) {
    this.applications = new BehaviorSubject<Application[]>([]);
  }

  /**
   * Получение списка приложений с сервера
   */
  fetchApplicationsList(): Observable<Application[]> {
    return from(this.resource.getAll())
      .pipe(
        map((data: IApplication[]) => {
          const result = [];
          data.forEach((item: IApplication) => {
            const application = new Application(item);
            result.push(application);
          });
          this.applications.next(result);
          return result;
        })
      );
  }

  /**
   * Возвращает список всех приложений
   */
  getApplicationsList(): Observable<Application[]> {
    return this.applications.asObservable();
  }

}
