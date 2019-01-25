import { Injectable } from '@angular/core';
import { CompaniesResource } from '../resources/companies.resource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IServerResponse } from '../../basic/interfaces/server-response.interface';
import { ICompany } from '../interfaces/company.interface';
import { IOffice } from '../interfaces/office.interface';
import { Company } from '../models/company.model';
import { Office } from '../models/office.model';
import { Division } from '../models/division.model';
import { Tree } from '../../basic/models/tree.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';
import {IDivision} from '@kolenergo/cpa';

@Injectable()
export class CompaniesService {
  public companies$: BehaviorSubject<Company[]>;
  public selectedCompany$: BehaviorSubject<Company>;
  public selectedOffice$: BehaviorSubject<Office>;
  public selectedDivision$: BehaviorSubject<Division>;
  public selectedCompanyDivisionTree: Tree<Division>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingCompany$: BehaviorSubject<boolean>;
  private addingOffice$: BehaviorSubject<boolean>;
  private addingDivision$: BehaviorSubject<boolean>;
  private editingCompany$: BehaviorSubject<boolean>;
  private editingOffice$: BehaviorSubject<boolean>;
  private editingDivision$: BehaviorSubject<boolean>;
  private deletingDivision$: BehaviorSubject<boolean>;

  constructor(private readonly resource: CompaniesResource) {
    this.companies$ = new BehaviorSubject<Company[]>([]);
    this.selectedCompany$ = new BehaviorSubject<Company>(null);
    this.selectedOffice$ = new BehaviorSubject<Office>(null);
    this.selectedDivision$ = new BehaviorSubject<Division>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingCompany$ = new BehaviorSubject<boolean>(false);
    this.addingOffice$ = new BehaviorSubject<boolean>(false);
    this.addingDivision$ = new BehaviorSubject<boolean>(false);
    this.editingCompany$ = new BehaviorSubject<boolean>(false);
    this.editingOffice$ = new BehaviorSubject<boolean>(false);
    this.editingDivision$ = new BehaviorSubject<boolean>(false);
    this.deletingDivision$ = new BehaviorSubject<boolean>(false);
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
   * Добавление нового структурного подразделения организации
   * @param division - Добавляемое структурное подразделение
   */
  addDivision(division: Division): Observable<Division> {
    this.addingDivision$.next(true);
    return from(this.resource.addDivision(division))
      .pipe(
        map((response: IServerResponse<IDivision>) => {
          const newDivision = new Division(response.data);
          newDivision.backup.setup(['parentId', 'title', 'order']);
          const selectedCompany = this.selectedCompany$.getValue();
          selectedCompany.divisions.push(newDivision);
          this.selectedCompany$.next(selectedCompany);
          this.selectedCompanyDivisionTree.add(newDivision);
          return newDivision;
        }),
        finalize(() => {
          this.addingDivision$.next(false);
        })
      );
  }

  /**
   * Изменение структурного подразделения орагнизации
   * @param division - Изменяемое структурное подразделение
   */
  editDivision(division: Division): Observable<Division> {
    this.editingDivision$.next(true);
    return from(this.resource.editDivision(division, null, {id: division.id}))
      .pipe(
        map((response: IServerResponse<IDivision>) => {
          division.backup.setup(['parentId', 'title', 'order']);
          this.selectedCompanyDivisionTree.getById(division.id).title = division.title;
          return division;
        }),
        finalize(() => {
          this.editingDivision$.next(false);
        })
      );
  }

  /**
   * Удаление структурного подразделения организации
   * @param division - Удаляемое структурное подразделение
   */
  deleteDivision(division: Division): Observable<boolean> {
    this.deletingDivision$.next(true);
    return from(this.resource.deleteDivision(null, null, {id: division.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          if (response.data === true) {
            const treeItem = this.selectedCompanyDivisionTree.getById(division.id);
            this.selectedCompanyDivisionTree.delete(treeItem);
            this.selectedDivision$.next(null);
          }
          return response.data;
        }),
        finalize(() => {
          this.deletingDivision$.next(false);
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
      this.selectedCompanyDivisionTree = new Tree(company.divisions, 'id', 'parentId', 'title');
      console.log(this.selectedCompanyDivisionTree);
    }
    return this.selectedCompany$.asObservable();
  }

  /**
   * Получение / установка текущего офиса организации
   * @param office - Офис, устанавливаемый текущим
   */
  selectedOffice(office?: Office | null): Observable<Office> {
    if (office) {
      this.selectedOffice$.next(office);
    }
    return this.selectedOffice$.asObservable();
  }

  /**
   * Получение / установка текущего структурного подразделения организации
   * @param division - Структурное подразделение, устанавливаемое текущим
   */
  selectedDivision(division?: Division | null): Observable<Division> {
    if (division) {
      this.selectedDivision$.next(division);
    }
    return this.selectedDivision$.asObservable();
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

  /**
   * Выполняется ли добавление нового структурного подразделения организации
   */
  isAddingDivision(): Observable<boolean> {
    return this.addingDivision$.asObservable();
  }

  /**
   * Выполняется ли изменение помещения организации
   */
  isEditingOffice(): Observable<boolean> {
    return this.editingOffice$.asObservable();
  }

  /**
   * Выполняется ли изменение структурного подразделения организации
   */
  isEditingDivision(): Observable<boolean> {
    return this.editingDivision$.asObservable();
  }

  /**
   * Выполняется ли удаление структурного подразделения организации
   */
  isDeletingDivision(): Observable<boolean> {
    return this.deletingDivision$.asObservable();
  }
}
