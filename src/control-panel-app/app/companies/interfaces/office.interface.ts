/**
 * Интерфейс, опи сывающий офис организации
 */
import {IOfficeLocation} from '@kolenergo/cpa';

export interface IOffice {
  id: number;                     // Идентификатор офиса
  companyId: number;              // Идентификатор организации
  departmentId: number;           // Идентификатор производственного отделения
  title: string;                  // Наименование
  address: string;                // Адрес
  floors: number;                 // Количество этажей
  isWithLoft: boolean;            // Есть ли чердак в заднии
  isWithBasement: boolean;        // Есть ли подвал в здании
  description: string;            // Описание
  locations?: IOfficeLocation[];  // Помещения в здании
}
