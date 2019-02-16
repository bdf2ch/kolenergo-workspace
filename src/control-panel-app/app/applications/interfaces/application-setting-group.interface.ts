/**
 * Интерфейс, описывающий группу настрек приложения
 */
export interface IApplicationSettingGroup {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  description: string;      // Описание
  cols: number;             // Количество колонок, занимаемое группой
  rows: number;             // Количество строк, занимаемое группой
  order: number;            // Порядок следования
  isList: boolean;          // Является ли списком однотипных настроек
}
