/**
 * Интерфейс добавления пользователя
 */
export interface IAddUser {
  readonly divisionId?: number;               // Идентификатор структурного подразделения
  readonly firstName: string;                 // Имя пользователя
  readonly secondName: string;                // Отчество пользователя
  readonly lastName: string;                  // Фамилия пользователя
  readonly position?: string;                 // Должность пользователя
  readonly email?: string;                    // E-mail пользователя
  readonly activeDirectoryAccount: string;    // Учетная запись Active Directory
}
