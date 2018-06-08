/**
 * Интерфейс, описывающий тип заявкки АХО
 */
export interface IAhoRequestType {
  id: number;                 // Идентификатор типа
  title: string;              // Наименование типа
  icon?: string;              // Иконка типа
  order: number;              // Порядок следования
  listTitle: string | null;   // Заголовок списка задач типа
  itemTitle: string | null;   // Заголовок поля ввода задачи типа
  isCountable: boolean;       // Измеряются ли задачи типа количественно
}
