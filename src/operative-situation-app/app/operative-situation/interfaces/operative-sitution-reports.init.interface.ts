import { ICompany } from '@kolenergo/cpa';
import { IOperativeSituationReport } from '../interfaces/operative-situation-report.interface';
import { IOperativeSituationConsumption } from './operative-situation-consumption.interface';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IOperativeSituationReportsInitialData {
  date: string;                                   // Текущая дата
  time: string;                                   // Текущее время
  companies?: ICompany[];                         // Список организаций
  reports: IOperativeSituationReport[];           // Список отчетов об оперативной обстановке
  consumption: IOperativeSituationConsumption;    // Максимум потребления за прошедшие сутки
}
