import { ICompany } from '@kolenergo/lib';
import { IOperativeSituationReport } from '../interfaces/operative-situation-report.interface';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IOperativeSituationReportsInitialData {
  date: string;                           // Текущая дата
  companies: ICompany[];                  // Список организаций
  reports: IOperativeSituationReport[];   // Список отчетов об оперативнйо обстановке
}
