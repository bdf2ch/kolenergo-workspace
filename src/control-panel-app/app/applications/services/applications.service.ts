import { Injectable } from '@angular/core';
import { ApplicationsResource } from '../resources/applications.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Application } from '../models/application.model';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { IApplication } from '../interfaces/application.interface';
import {finalize, map} from "rxjs/operators";
import { IServerResponse } from '@kolenergo/lib';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import {ApplicationMenuItem} from '../../dashboard/models/application-menu-item.model';



@Injectable()
export class ApplicationsService {
  private applications: BehaviorSubject<Application[]>;
  private fetchingData: BehaviorSubject<boolean>;

  constructor(private readonly resource: ApplicationsResource,
              private readonly dashboard: DashboardService) {
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
          const appMenuItem = this.dashboard.menu.getItemById('applications');
          console.log('app menu', appMenuItem);
          // menuItem.clearSubMenu();
          data.data.forEach((item: IApplication) => {
            /*
            const application = new Application(item);
            result.push(application);
            appMenuItem.addItem({
              id: application.code,
              title: application.title,
              link: `/applications/${application.id}`,
              icon: 'web'
            });
            */
            const application = new Application(item);
            result.push(application);
            // this.applications.addApplication(application);
            appMenuItem.addItem({
              id: String(application.id),
              title: application.title,
              link: `/applications/${application.id}`,
              icon: 'web'
            });
          });
          //this.applications.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData.next(false);
        })
      );
  }

  /**
   * Добавление приложения
   * @param application - Добавляемое приложение
   */
  addApplication(application: Application): Application[] {
    this.applications.value.push(application);
    return this.applications.value;
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
