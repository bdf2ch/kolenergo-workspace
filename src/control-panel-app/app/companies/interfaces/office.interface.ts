/**
 * Интерфейс, опи сывающий офис организации
 */
export interface IOffice {
  id: number;                   // Идентификатор офиса
  companyId: number;            // Идентификатор организации
  departmentId: number;         // Идентификатор производственного отделения
  title: string;                // Наименование
  address: string;              // Адрес
  floors: number;               // Количество этажей
  isWithLoft: boolean;          // Есть ли чердак в заднии
  isWithBasement: boolean;      // Есть ли подвал в здании
  description: string;          // Описание
}
