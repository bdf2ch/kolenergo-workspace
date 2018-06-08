import { IAhoRequestStatus } from './aho-request-status.interface';

/**
 * Интерфейс, описывающий изменение статуса заявки
 */
export interface IAhoRequestStatusChange {
  id: number;
  dateCreated: Date;
  status: IAhoRequestStatus;
}
