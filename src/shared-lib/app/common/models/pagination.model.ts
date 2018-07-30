import { IPagination } from '../interfaces/pagination.interface';

/**
 * Класс, реализующий интрефейс паинации
 */
export class Pagination implements IPagination {
  totalItems: number;                 // Общее количество записей
  itemsOnPage: number;                // Количество записей на странице
  totalPages: number;                 // Общее количество страниц
  currentPage: number;                // Текущая страница

  /**
   * Конструктор
   * @param {IPagination} config - Параметры инициализации
   */
  constructor(config?: IPagination) {
    this.totalItems = config ? config.totalItems : 0;
    this.itemsOnPage = config ? config.itemsOnPage : 0;
    this.totalPages = this.itemsOnPage > 0 ? Math.floor(this.totalItems / this.itemsOnPage) : 0;
    this.currentPage = 0;
  }

  /**
   * Переход на следующую страницу
   * @returns {number}
   */
  nextPage(): number {
    this.currentPage += 1;
    return this.currentPage;
  }

  /**
   * Переход на предыдущую страницу
   * @returns {number}
   */
  previousPage(): number {
    this.currentPage -= 1;
    return this.currentPage;
  }

  /**
   * Переход на указанную страницу
   * @param page {Number} - Номер страницы
   */
  setPage(page: number): number {
    this.currentPage = page <= this.totalPages && page >= 0 ? page : this.currentPage;
    return this.currentPage;
  }

  /**
   * Открыта ли последняя страница
   */
  isOnTheLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }
}
