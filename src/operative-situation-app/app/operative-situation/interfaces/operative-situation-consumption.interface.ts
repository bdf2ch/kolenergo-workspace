import { ICompany, IUser } from '@kolenergo/cpa';

/**
 * Интерфейс, описывающий отчет о максимальном потреблении за прошедшие сутки
 */
export interface IOperativeSituationConsumption {
  id: number;               // Идентификатор
  company: ICompany;        // Организация
  user: IUser;              // Пользователь
  date: string;             // Дата
  consumption: number;      // потребление
  dateCreated: Date;        // Дата создания
  dateChanged: Date;        // Дата изменения
}
