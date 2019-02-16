import { IDepartment, IDivision } from './';
import { IWeatherSummary } from '@kolenergo/osr';

/**
 * Интерфейс, описывающий организацию
 */
export interface ICompany {
  id: number;                         // Идентификатор
  title: string;                      // Наименование
  shortTitle: string;                 // Короткое наименование
  activeDirectoryUid: string;         // Идентификатор в Active Directory
  departments?: IDepartment[];        // Список производственных отделений организации
  divisions?: IDivision[];            // Список структурных подразделений организации
  weatherSummary?: IWeatherSummary;   // Погодная сводка
}
