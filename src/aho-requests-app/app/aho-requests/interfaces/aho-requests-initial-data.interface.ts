import {IAhoRequestType} from './aho-request-type.interface';
import {IAhoRequestStatus} from './aho-request-status.interface';
import {IAhoRequestTaskContent} from './aho-request-task-content.interface';
import {IAhoRequestRejectReason} from './aho-request-reject-reason.interface';
import {IUser} from '@kolenergo/lib';
import {IAhoRequest} from './aho-request.interface';

/**
 * Данные для инициализации приложения
 */
export interface IAhoRequestsInitialData {
  types: IAhoRequestType[];                     // Типы заявок
  statuses: IAhoRequestStatus[];                // Статусы заявок
  tasks: IAhoRequestTaskContent[];              // Содержимое задач заявок
  rejectReasons: IAhoRequestRejectReason[];     // Причины отклонения заявок
  employees: IUser[];                           // Сотрудники
  requests: IAhoRequest[];                      // Заявки
  employeeRequests: number;                     // Заявки сотрудника
  expiredRequests: number;                      // Просроченные заявки
  totalRequests: number;                        // Общее количество заявок
  ownRequests?: number;

  allRequests: {
    totalRequestsCount: number;
    newRequestsCount: number;
  };
  ownRequests_: {
    totalRequestsCount: number;
    uncompletedRequestsCount: number;
  };
  employeeRequests_: {
    totalRequestsCount: number;
    uncompletedRequestsCount: number;
  };
  expiredRequests_: {
    totalRequestsCount: number;
  };
}
