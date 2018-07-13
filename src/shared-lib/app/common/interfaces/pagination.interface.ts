/**
 * Интерфейс, описывающий пагинацию
 */
export interface IPagination {
  total: number;            // Общее количество записей
  pageSize: number;         // Количество зпаписей на одной странице
  totalPages: number;       // Общее количество страниц
  currentPage: number;      // Текущая страница
}
