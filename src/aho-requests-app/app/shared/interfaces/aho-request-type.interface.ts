/**
 * Интерфейс, описывающий тип заявкки АХО
 */
export interface IAhoRequestType {
  id: number;       // Идентификатор типа
  title: string;    // Наименование типа
  icon?: string;    // Иконка типа
  order: number;    // Порядок следования
}
