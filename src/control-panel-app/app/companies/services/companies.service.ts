import { Injectable } from '@angular/core';
import { CompaniesResource } from '../resources/companies.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IServerResponse } from '../../common/interfaces/server-response.interface';
import { ICompany } from '../interfaces/company.interface';
import { IOffice } from '../interfaces/office.interface';
import { Company } from '../models/company.model';
import { Office } from '../models/office.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class CompaniesService {
  public companies$: BehaviorSubject<Company[]>;
  public selectedCompany$: BehaviorSubject<Company>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingCompany$: BehaviorSubject<boolean>;
  private addingOffice$: BehaviorSubject<boolean>;
  private editingCompany$: BehaviorSubject<boolean>;

  constructor(private readonly resource: CompaniesResource) {
    this.companies$ = new BehaviorSubject<Company[]>([]);
    this.selectedCompany$ = new BehaviorSubject<Company>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingCompany$ = new BehaviorSubject<boolean>(false);
    this.addingOffice$ = new BehaviorSubject<boolean>(false);
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
            company.backup.setup(['title', 'shortTitle', 'activeDirectoryUid', 'departments', 'offices']);
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

  /**
   * Добавление новой организации
   * @param company - Добавляемая организация
   */
  addCompany(company: Company): Observable<Company> {
    this.addingCompany$.next(true);
    return from(this.resource.addCompany(company))
      .pipe(
        map((response: IServerResponse<ICompany>) => {
          const newCompany = new Company(response.data);
          newCompany.backup.setup(['title', 'shortTitle', 'activeDirectoryUid', 'departments', 'offices']);
          this.companies$.next(this.companies$.getValue().slice().concat([newCompany]));
          return newCompany;
        }),
        finalize(() => {
          this.addingCompany$.next(false);
        })
      );
  }

  /**
   * Добавление нового офиса организации
   * @param office - Добавляемый офис организации
   */
  addOffice(office: Office): Observable<Office> {
    this.addingOffice$.next(true);
    return from(this.resource.addOffice(office))
      .pipe(
        map((response: IServerResponse<IOffice>) => {
          const newOffice = new Office(response.data);
          newOffice.backup.setup(['title', 'address', 'floors', 'description', 'isWithLoft', 'isWithBasement']);
          const selectedCompany = this.selectedCompany$.getValue();
          selectedCompany.offices.push(newOffice);
          this.selectedCompany$.next(selectedCompany);
          return newOffice;
        }),
        finalize(() => {
          this.addingOffice$.next(false);
        })
      );
  }

  /**
   * Получение / установка текущей организации
   * @param company - Организация, устанавливаемая текущей
   */
  selectedCompany(company?: Company | null): Observable<Company> {
    if (company) {
      this.selectedCompany$.next(company);
    }
    return this.selectedCompany$.asObservable();
  }

  getCompanyById(id: number): Company | null {
    const findCompanyById = (company: Company) => company.id === id;
    const result = this.companies$.getValue().find(findCompanyById);
    return result ? result : null;
  }

  /**
   * Выполняется ли добавление нового офиса организации
   */
  isAddingOffice(): Observable<boolean> {
    return this.addingOffice$.asObservable();
  }

}
