import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AuthenticationService, IServerResponse} from "@kolenergo/lib";
import { ICompany, Company } from '@kolenergo/cpa';
import { OperativeSituationResource } from '../resources/operative-situation.resource';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';
import { IOperativeSituationReport, IOperativeSituationReportsInitialData, OperativeSituationReport } from '@kolenergo/osr';
import {OperativeSituationConsumption} from '../models/operative-situation-consumption.model';


@Injectable()
export class OperativeSituationService {
  private date$: BehaviorSubject<string>;
  private companies$: BehaviorSubject<ICompany[]>;
  private reports$: BehaviorSubject<OperativeSituationReport[]>;
  private consumption$: BehaviorSubject<OperativeSituationConsumption>;
  private timePeriods: string[];
  private selectedCompany$: BehaviorSubject<ICompany>;
  private selectedReport$: BehaviorSubject<OperativeSituationReport>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingReport$: BehaviorSubject<boolean>;
  private editingReport$: BehaviorSubject<boolean>;


  constructor(private readonly resource: OperativeSituationResource,
              private readonly auth: AuthenticationService) {
    this.date$ = new BehaviorSubject<string>(null);
    this.companies$ = new BehaviorSubject<ICompany[]>([]);
    this.selectedCompany$ = new BehaviorSubject<ICompany>(null);
    this.reports$ = new BehaviorSubject<OperativeSituationReport[]>([]);
    this.consumption$ = new BehaviorSubject<OperativeSituationConsumption>(null);
    this.timePeriods = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    this.selectedReport$ = new BehaviorSubject<OperativeSituationReport>(null);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingReport$ = new BehaviorSubject<boolean>(false);
    this.editingReport$ = new BehaviorSubject<boolean>(false);
  }

  fetchInitialData(companyId: number): Observable<OperativeSituationReport[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getInitialData({companyId: companyId}))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReportsInitialData>) => {
          this.date$.next(response.data.date);
          const companies = [];
          response.data.companies.forEach((item: ICompany) => {
            const company = new Company(item);
            companies.push(company);
          });
          this.companies$.next(companies);
          if (this.auth.getCurrentUser()) {
            this.selectedCompany(this.auth.getCurrentUser().company);
          }
          // this.selectedCompany$.next(companies[0]);
          this.consumption$.next(new OperativeSituationConsumption(response.data.consumption));
          console.log('consumption', this.consumption$.getValue());
          const reports = [];
          response.data.reports.forEach((item: IOperativeSituationReport) => {
            const report = new OperativeSituationReport(item);
            report.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'consumption', 'violations']);
            reports.push(report);
          });
          this.reports$.next(reports);
          return reports;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
          console.log('date', this.date$.getValue());
          console.log('reports', this.reports$.getValue());
          console.log('companies', this.companies$.getValue());
        })
      );
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
          report.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'consumption', 'violations']);
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
   * Изменение отчета об оперативнйо обстановке
   * @param report - Редактируемый отчет об оперативной обстановке
   */
  editReport(report: OperativeSituationReport): Observable<OperativeSituationReport | null> {
    this.editingReport$.next(true);
    return from(this.resource.editReport(report))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReport>) => {
          report.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'consumption', 'violations']);
          return report;
        }),
        finalize(() => {
          this.editingReport$.next(false);
        })
      );
  }


  /**
   * Возвращает текущую дату на сервере
   */
  date(): Observable<string> {
    return this.date$.asObservable();
  }

  /**
   * Возвращает список временых периодов
   */
  periods(): string[] {
    return this.timePeriods;
  }

  /**
   * Возвращает список отчетов об оперативной обстановке
   */
  reports(): Observable<OperativeSituationReport[]> {
    return this.reports$.asObservable();
  }

  /**
   * Возвращает максимум потребления за прошедшие сутки
   */
  consumption(): Observable<OperativeSituationConsumption> {
    return this.consumption$.asObservable();
  }

  /**
   * Возвращает список организаций
   */
  companies(): Observable<ICompany[]> {
    return this.companies$.asObservable();
  }

  /**
   * Установка / получение выбранного отчета об оперативной обстановке
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

  /**
   * Установка / получение выбранной организации
   * @param company - Выбираемая организация
   */
  selectedCompany(company?: ICompany | null): ICompany | null {
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
