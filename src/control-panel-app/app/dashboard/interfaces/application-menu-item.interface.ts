/**
 * Интерфейс, описывающий элемент меню приложения
 */
export interface IApplicationMenuItem {
  id: string;                 // Идентификатор
  title: string;              // Наименование
  link: string;               // Ссылка
  icon: string;               // Иконка
  isButtonEnabled?: boolean;  //
  action?: string;
}
