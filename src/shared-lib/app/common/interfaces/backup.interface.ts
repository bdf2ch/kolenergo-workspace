/**
 * Интерфейс, описывающий резервную копию данных модели
 */
export interface IBackup {
  backup?: {
    data?: any;     // Данные для восстановления
  };
}
