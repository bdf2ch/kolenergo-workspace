/**
 * Интерфейс, описывающий роль пользователя
 */
export interface IRole {
  id: number;                 // Идентификатор
  applicationId: number;      // Идентификатор приложения
  code: string;               // Код роли
  isEnabled: boolean;         // Включена ли роль
}
