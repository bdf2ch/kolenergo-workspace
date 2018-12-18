import { Injectable } from '@angular/core';
import { CompaniesResource } from '../resources/companies.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ICompany, Company } from '@kolenergo/cpa';
import { MatTableDataSource } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {from} from 'rxjs/observable/from';
import {finalize, map} from 'rxjs/operators';
import {IServerResponse} from '@kolenergo/lib';

@Injectable()
export class CompaniesService {
  private companies$: BehaviorSubject<Company[]>;
  private selectedCompany$: BehaviorSubject<Company>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingCompany$: BehaviorSubject<boolean>;
  private editingCompany$: BehaviorSubject<boolean>;

  constructor(private readonly resource: CompaniesResource) {
    this.companies$ = new BehaviorSubject<Company[]>([]);
    this.selectedCompany$ = new BehaviorSubject<Company>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingCompany$ = new BehaviorSubject<boolean>(false);
    this.editingCompany$ = new BehaviorSubject<boolean>(false);
  }

  /**
   * Получение списка приложений с сервера
   */
  fetchCompaniesList(): Observable<Company[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getAll())
      .pipe(
        map((response: IServerResponse<ICompany[]>) => {
          const result = [];
          response.data.forEach((item: ICompany) => {
            const company = new Company(item);
            company.backup.setup(['title', 'shortttile', 'activeDirectoryUid', 'departments', 'offices']);
            result.push(company);
          });
          this.companies$.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
        })
      );
  }

}
