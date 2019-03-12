import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IServerResponse } from '@kolenergo/cpa';
import { ICompany, Company, AuthenticationService } from '@kolenergo/cpa';
import { OperativeSituationResource } from '../resources/operative-situation.resource';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { finalize, map } from 'rxjs/operators';
import {ILocation, IOperativeSituationReport, IOperativeSituationReportsInitialData, OperativeSituationReport} from "@kolenergo/osr";
import { OperativeSituationConsumption } from '../models/operative-situation-consumption.model';
import { IOperativeSituationConsumption } from '../interfaces/operative-situation-consumption.interface';
import * as moment from 'moment';
import * as saver from 'file-saver';
import {MatTableDataSource} from "@angular/material";


@Injectable()
export class OperativeSituationService {
  public date$: BehaviorSubject<string>;
  private companies$: BehaviorSubject<ICompany[]>;
  private reports$: BehaviorSubject<OperativeSituationReport[]>;
  public consumption$: BehaviorSubject<OperativeSituationConsumption>;
  private timePeriods: string[];
  private selectedCompany$: BehaviorSubject<ICompany>;
  public selectedReport$: BehaviorSubject<OperativeSituationReport>;
  public selectedPeriod$: BehaviorSubject<string>;
  private fetchingData$: BehaviorSubject<boolean>;
  private addingReport$: BehaviorSubject<boolean>;
  private addingConsumption$: BehaviorSubject<boolean>;
  private editingReport$: BehaviorSubject<boolean>;
  private editingConsumption$: BehaviorSubject<boolean>;
  public locationsDataSource: MatTableDataSource<ILocation>;


  constructor(private readonly resource: OperativeSituationResource,
              private readonly auth: AuthenticationService) {
    this.date$ = new BehaviorSubject<string>(null);
    this.companies$ = new BehaviorSubject<ICompany[]>([]);
    this.selectedCompany$ = new BehaviorSubject<ICompany>(null);
    this.reports$ = new BehaviorSubject<OperativeSituationReport[]>([]);
    this.consumption$ = new BehaviorSubject<OperativeSituationConsumption>(null);
    this.timePeriods = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    this.selectedReport$ = new BehaviorSubject<OperativeSituationReport>(null);
    this.selectedPeriod$ = new BehaviorSubject<string>(this.timePeriods[0]);
    this.fetchingData$ = new BehaviorSubject<boolean>(false);
    this.addingReport$ = new BehaviorSubject<boolean>(false);
    this.addingConsumption$ = new BehaviorSubject<boolean>(false);
    this.editingReport$ = new BehaviorSubject<boolean>(false);
    this.editingConsumption$ = new BehaviorSubject<boolean>(false);
    this.locationsDataSource = new MatTableDataSource<ILocation>([]);
  }

  /**
   * Получение данных для иницилизации приложения
   * @param companyId - Идентификатор организации
   */
  fetchInitialData(companyId: number): Observable<OperativeSituationReport[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getInitialData({companyId: companyId}))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReportsInitialData>) => {
          this.date$.next(response.data.date);
          const currentTime = moment(this.date$.getValue() + ', ' + response.data.time, 'DD.MM.YYYY, HH:mm');
          this.timePeriods.forEach((period: string) => {
            const periodStart = moment(this.date$.getValue() + ', ' + period, 'DD.MM.YYYY, HH:mm');
            const periodEnd = moment(periodStart).add(3, 'hours');
            if (currentTime.unix() >= periodStart.unix() && currentTime.unix() <= periodEnd.unix()) {
              this.selectedPeriod$.next(period);
            }
          });
          const companies = [];
          response.data.companies.forEach((item: ICompany) => {
            const company = new Company(item);
            companies.push(company);
          });
          this.companies$.next(companies);
          if (this.auth.getCurrentUser()) {
            const comp = this.getCompanyById(this.auth.getCurrentUser().company.id);
            this.selectedCompany$.next(comp ? comp : this.companies$.getValue()[0]);
          }
          // this.selectedCompany$.next(companies[0]);
          const consumption = response.data.consumption ? new OperativeSituationConsumption(response.data.consumption) : null;
          if (consumption) {
            consumption.backup.setup(['consumption']);
          }
          this.consumption$.next(consumption);
          const reports = [];
          response.data.reports.forEach((item: IOperativeSituationReport) => {
            const report = new OperativeSituationReport(item);
            report.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'violations']);
            reports.push(report);
          });
          this.reports$.next(reports);
          this.selectedReport$.next(this.getReportByTimePeriod(this.selectedPeriod$.getValue()));
          return reports;
        }),
        finalize(() => {
          this.fetchingData$.next(false);
        })
      );
  }

  fetchReports(companyId: number): Observable<OperativeSituationReport[]> {
    this.fetchingData$.next(true);
    return from(this.resource.getReports({companyId: companyId}))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReportsInitialData>) => {
          const reports = [];
          response.data.reports.forEach((item: IOperativeSituationReport) => {
            const report = new OperativeSituationReport(item);
            report.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'violations']);
            reports.push(report);
          });
          this.reports$.next(reports);
          this.selectedReport$.next(this.getReportByTimePeriod(this.selectedPeriod$.getValue()));
          const consumption = response.data.consumption ? new OperativeSituationConsumption(response.data.consumption) : null;
          if (consumption) {
            consumption.backup.setup(['consumption']);
          }
          this.consumption$.next(consumption);
          return this.reports$.getValue();
        }),
        finalize(() => {
          this.fetchingData$.next(false);
        })
      );
  }

  /**
   * Добавление нового отчета об оперативной обстановке
   * @param report - Добавляемый отчет об оперативной обстановке
   */
  addReport(report: OperativeSituationReport): Observable<OperativeSituationReport | null> {
    this.addingReport$.next(true);
    return from(this.resource.addReport(report))
      .pipe(
        map((response: IServerResponse<IOperativeSituationReport>) => {
          const newReport = new OperativeSituationReport(response.data);
          newReport.backup.setup(['equipment_35_150', 'equipment_network', 'weather', 'resources', 'consumption', 'violations']);
          const reports = this.reports$.getValue().slice();
          reports.push(newReport);
          this.reports$.next(reports);
          this.selectedReport$.next(newReport);
          this.locationsDataSource = new MatTableDataSource<ILocation>(newReport.weatherSummary ? newReport.weatherSummary.locations : []);
          return newReport;
        }),
        finalize(() => {
          this.addingReport$.next(false);
        })
      );
  }

  /**
   * Добавление отчета о максимальном потреблении за прошедшие сутки
   * @param consumption - Добавляемый отчет о максимальном потреблении за прошедшие сутки
   */
  addConsumption(consumption: OperativeSituationConsumption): Observable<OperativeSituationConsumption | null> {
    this.addingConsumption$.next(true);
    return from(this.resource.addConsumption(consumption))
      .pipe(
        map((response: IServerResponse<IOperativeSituationConsumption>) => {
          const cons = new OperativeSituationConsumption(response.data);
          cons.backup.setup(['consumption']);
          this.consumption$.next(cons);
          return consumption;
        }),
        finalize(() => {
          this.addingConsumption$.next(false);
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
   * Изменение отчета о максимальном потреблении за прошедшие сутки
   * @param report - Изменяемый отчет о максимальном потреблении за прошедшие сутки
   */
  editConsumption(consumption: OperativeSituationConsumption): Observable<OperativeSituationConsumption | null> {
    this.editingConsumption$.next(true);
    return from(this.resource.editConsumption(consumption))
      .pipe(
        map((response: IServerResponse<IOperativeSituationConsumption>) => {
          consumption.backup.setup(['consumption']);
          return consumption;
        }),
        finalize(() => {
          this.editingConsumption$.next(false);
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
   * Поиск отчета по временому промежутку
   * @param timePeriod - Временной промежуток
   */
  getReportByTimePeriod(timePeriod: string): OperativeSituationReport | null {
    let result = null;
    this.reports$.getValue().forEach((report: OperativeSituationReport) => {
      if (report.periodTime === timePeriod) {
        result = report;
      }
    });
    return result;
  }

  /**
   * Возвращает максимум потребления за прошедшие сутки
   */
  consumption(): Observable<OperativeSituationConsumption> {
    return this.consumption$.asObservable();
  }

  getConsumption(): OperativeSituationConsumption | null {
    return this.consumption$.getValue();
  }

  /**
   * Возвращает список организаций
   */
  companies(): Observable<ICompany[]> {
    return this.companies$.asObservable();
  }

  getCompanyById(companyId: number): ICompany | null {
    const findCompanyById = (company: ICompany) => company.id === companyId;
    const result = this.companies$.getValue().find(findCompanyById);
    return result ? result : null;
  }

  /**
   * Установка / получение выбранного временного периода
   * @param period - Устанавливаемый временной период
   */
  selectedPeriod(period?: string): string | null {
    if (period) {
      this.selectedPeriod$.next(period);
    }
    return this.selectedPeriod$.getValue();
  }

  /**
   * Установка / получение выбранного отчета об оперативной обстановке
   * @param reportId - Идентификатор отчета об оперативной обстановке
   */
  selectedReport(reportId?: number | null): Observable<OperativeSituationReport> {
    if (reportId) {
      const findReportById = (report: OperativeSituationReport) => report.id === reportId;
      const report_ = this.reports$.getValue().find(findReportById);
      if (report_) {
        this.selectedReport$.next(report_);
        this.locationsDataSource = new MatTableDataSource<ILocation>(report_.weatherSummary ? report_.weatherSummary.locations : []);
      }
    } else if (reportId === null) {
      this.selectedReport$.next(null);
    }
    return this.selectedReport$.asObservable();
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
   * Экспорт отчета в Excel
   * @param date - Дата отчета
   * @param period - Период отчета
   */
  async exportReport(date: string, period: string): Promise<string | null> {
    try {
      this.fetchingData$.next(true);
      const result  = await this.resource.exportReport(null, {date: date, period: period}, null);
      if (result) {
        this.fetchingData$.next(false);
        saver.saveAs(result, `${date} ${period}.xlsx`);
      }
    } catch (error) {
      console.error(error);
      this.fetchingData$.next(false);
      return null;
    }
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

  /**
   * Выполняется ли добавление данных о максимальном потреблении за прошедшие сутки
   */
  isAddingConsumption(): Observable<boolean> {
    return this.addingConsumption$.asObservable();
  }

  /**
   * Выполняется ли сохранение изменений в отчете о максимальном потреблении за прошедшие сутки
   */
  isEditingConsumption(): Observable<boolean> {
    return this.editingConsumption$.asObservable();
  }
}
