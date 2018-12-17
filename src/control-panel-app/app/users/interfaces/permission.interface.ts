/**
 * Интерфейс, описывающий право пользователя
 */
export interface IPermission {
  id: number;             // Идентфиикатор права пользователя
  applicationId: number;  // Идентификатор приложения
  code: string;           // Код права пользователя
  title: string;          // Наименование права пользователя
  isEnabled?: boolean;    // Доступно ли право пользователя
}
