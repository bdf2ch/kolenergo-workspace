import { IUser } from '@kolenergo/cpa';

/**
 * Интерфейс, описывающий отчет о максимальном потреблении за прошедшие сутки
 */
export interface IOperativeSituationConsumption {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  user: IUser;              // Пользователь
  date: string;             // Дата
  dateCreated: Date;        // Дата создания
  dateChanged: Date;        // Дата изменения
}
