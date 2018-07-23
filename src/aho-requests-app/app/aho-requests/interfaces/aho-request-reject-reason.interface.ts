/**
 * Интерфейс, описывающий причину отказа заявки АХО
 */
export interface IAhoRequestRejectReason {
  id: number;                 // Идентификатор
  requestTypeId: number;      // Идентификатор типа заявки АХО
  content: string;            // Содержание причины отказа
}
