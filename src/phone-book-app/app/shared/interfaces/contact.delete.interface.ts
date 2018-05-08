/**
 * Интерфейс удаления абонента
 */
export interface IDeleteContact {
  id: number;                // Идентификатор абонента
  putToArchive?: boolean;    // Поместить абонента в архив
}
