/**
 * Интерфейс, описывающий роль пользователя
 */
export interface IRole {
  id: number;                 // Идентификатор
  applicationId: number;      // Идентификатор приложения
  isEnabled: boolean;         // Включена ли роль
}
