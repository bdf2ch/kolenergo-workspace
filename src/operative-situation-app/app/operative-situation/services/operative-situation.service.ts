import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Company, ICompany, IServerResponse } from '@kolenergo/lib';
import { OperativeSituationResource } from '../resources/operative-situation.resource';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';
import { IOperativeSituationReport, OperativeSituationReport } from '@kolenergo/osr';


@Injectable()
export class OperativeSituationService {
  private companies$: BehaviorSubject<Company[]>;
  private reports$: BehaviorSubject<OperativeSituationReport[]>;
  private selectedCompany$: BehaviorSubject<Company>;
  private selectedReport$: BehaviorSubject<OperativeSituationReport>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingReport$: BehaviorSubject<boolean>;
  private editingReport$: BehaviorSubject<boolean>;


  constructor(private readonly resource: OperativeSituationResource) {
    this.companies$ = new BehaviorSubject<Company[]>([]);
    this.selectedCompany$ = new BehaviorSubject<Company>(null);
    this.reports$ = new BehaviorSubject<OperativeSituationReport[]>([]);
    this.selectedReport$ = new BehaviorSubject<OperativeSituationReport>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingReport$ = new BehaviorSubject<boolean>(false);
    this.editingReport$ = new BehaviorSubject<boolean>(false);
  }


  fetchReports(companyId: number): Observable<OperativeSituationReport[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getReports({companyId: companyId}))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReport[]>) => {
          const result = [];
          response.data.forEach((item: IOperativeSituationReport) => {
            const report = new OperativeSituationReport(item);
            report.backup.setup([]);
            result.push(report);
          });
          this.reports$.next(result);
          return result;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
          console.log(this.reports$.getValue());
        })
      );
  }

  fetchCompanies(): Observable<Company[]> {
    return from(this.resource.getCompanies())
      .pipe(
        map((response: ICompany[]) => {
          const result = [];
          response.forEach((item: ICompany) => {
            const company = new Company(item);
            result.push(company);
          });
          this.companies$.next(result);
          return result;
        }),
        finalize(() => {
          console.log('companies', this.companies$.getValue());
        })
      );
  }

  /**
   * Добавление новой роли пользователя
   * @param report - Добавляемый отчет об оперативной обстановке
   */
  addReport(report: OperativeSituationReport): Observable<OperativeSituationReport | null> {
    this.addingReport$.next(true);
    return from(this.resource.addReport(report))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReport>) => {
          const newReport = new OperativeSituationReport(response.data);
          console.log('newreport', newReport);
          // newReport.backup.setup(['code', 'title', 'isEnabled']);
          const reports = this.reports$.getValue().slice();
          reports.push(newReport);
          this.reports$.next(reports);
          return newReport;
        }),
        finalize(() => {
          this.addingReport$.next(false);
        })
      );
  }

  /**
   * Изменение роли пользователя
   * @param report - Изменяемый отчет об оперативнйо обстановке
   */
  /*
  editReport(report: OperativeSituationReport): Observable<OperativeSituationReport | null> {
    this.editingRole$.next(true);
    return from(this.resource.editRole(role, null, {id: role.id}))
      .pipe(
        map((response: IServerResponse<IRole>) => {
          role.backup.setup(['code', 'title', 'isEnabled']);
          return role;
        }),
        finalize(() => {
          this.editingRole$.next(false);
        })
      );
  }
  */

  /**
   * Возвращает список отчетов об оперативной обстановке
   */
  reports(): Observable<OperativeSituationReport[]> {
    return this.reports$.asObservable();
  }

  companies(): Observable<Company[]> {
    return this.companies$.asObservable();
  }


  /**
   * Установка / получение выбранного отчета об оперативнйо обстановке
   * @param reportId - Идентификатор отчета об оперативной обстановке
   */
  selectedReport(reportId?: number): OperativeSituationReport | null {
    if (reportId) {
      const findReportById = (report: OperativeSituationReport) => report.id === reportId;
      const searchResult = this.reports$.getValue().find(findReportById);
      if (searchResult) {
        this.selectedReport$.next(searchResult);
      }
    }
    return this.selectedReport$.getValue();
  }

  selectedCompany(company?: Company | null): Company | null {
    if (company) {
      this.selectedCompany$.next(company);
    }
    return this.selectedCompany$.getValue();
  }



  /**
   * Выпорлняется ли получение данных с сервера
   */
  isFetchingData(): Observable<boolean> {
    return this.fetchingData$.asObservable();
  }

  /**
   * Выполняется ли добавление нового отчета об оперативной обстановке
   */
  isAddingReport(): Observable<boolean> {
    return this.addingReport$.asObservable();
  }

  /**
   * Выполняется ли сохранение изменений в отчете об оперативнйо обстановке
   */
  isEditingReport(): Observable<boolean> {
    return this.editingReport$.asObservable();
  }
}
