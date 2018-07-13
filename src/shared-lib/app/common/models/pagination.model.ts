import { IPagination } from '../interfaces/pagination.interface';

/**
 * Класс, реализующий интрефейс паинации
 */
export class Pagination implements IPagination {
  total: number;                // Общее количество записей
  pageSize: number;             // Количество записей на странице
  totalPages: number;           // Общее количество страниц
  currentPage: number;          // Текущая страница

  /**
   * Конструктор
   * @param {IPagination} config - Параметры инициализации
   */
  constructor(config?: IPagination) {
    this.total = config ? config.total : 0;
    this.pageSize = config ? config.pageSize : 0;
    this.totalPages = config ? config.totalPages : 0;
    this.currentPage = config ? config.currentPage : 1;
  }

  /**
   * Переход на следующую страницу
   * @returns {number}
   */
  nextPage(): number {
    this.currentPage++;
    return this.currentPage;
  }

  /**
   * Переход на предыдущую страницу
   * @returns {number}
   */
  previousPage(): number {
    this.currentPage--;
    return this.currentPage;
  }
}
