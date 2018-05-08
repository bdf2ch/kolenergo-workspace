/**
 * Интерфейс добавления абонента
 */
export interface IAddContact {
  readonly userId: number;                    // Идентификатор пользователя
  readonly officeId: number;                  // Идентификатор офиса организации
  readonly divisionId: number;                // Идентификатор структурного подразделения
  readonly firstName: string;                 // Имя пользователя
  readonly secondName: string;                // Отчество пользователя
  readonly lastName: string;                  // Фамилия пользователя
  readonly position: string;                  // Должность пользователя
  readonly email: string;                     // E-mail пользователя
  readonly room: string;                      // Кабинет абонента
  readonly order: number;                     // Порядок следования в структурном подразделении
}
