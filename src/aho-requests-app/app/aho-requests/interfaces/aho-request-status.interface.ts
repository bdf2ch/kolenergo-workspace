/**
 * Интерфейс, описывающий статус заявки АХО
 */
export interface IAhoRequestStatus {
  id: number;         // Идентфикатор статуса заявки
  title: string;      // Наименование статуса заявки
  icon?: string;      // Иконка статуса заявки
  iconColor: string;  // Цвет иконки статуса
}
