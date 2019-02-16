/**
 * Интерфейс, описывающий помещение офиса
 */
export interface IOfficeLocation {
  id: number;             // Идентфиикатор
  companyId: number;      // Идентификатор организации
  departmentId: number;   // Идентификатор подразделения
  officeId: number;       // Идентификатор офиса
  floor: number;          // Этаж
  title: string;          // Наименование
  description?: string;   // Описание
}
