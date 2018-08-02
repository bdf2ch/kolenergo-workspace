import { AhoRequestFilter } from './aho-request-filter.model';

export class FilterManager {
  filters_: AhoRequestFilter<any>[];
  filters: any;

  /**
   * Конструктор
   */
  constructor() {
    this.filters_ = [];
    this.filters = {};
  }

  /**
   * Добавление фильтра
   * @param {AhoRequestFilter<any>} filter
   */
  addFilter(filter: AhoRequestFilter<any>) {
    this.filters_.push(filter);
    this.filters[filter.title] = filter;
  }

  /**
   * Поиск фильтра по наимаенованию
   * @param {string} title - Наименование фильтра
   * @returns {AhoRequestFilter<any> | null}
   */
  getFilterByTitle(title: string): AhoRequestFilter<any> | null {
    const findFilterByTitle = (item: AhoRequestFilter<any>) => item.title === title;
    const filter = this.filters_.find(findFilterByTitle);
    return filter ? filter : null;
  }

  /**
   * Получение активных фильтров
   * @returns {AhoRequestFilter<any>[]}
   */
  getSelectedFilters(): AhoRequestFilter<any>[] {
    const result = [];
    this.filters_.forEach((filter: AhoRequestFilter<any>) => {
      if (filter.value !== null) {
        result.push(filter);
      }
    });
    return result;
  }

  /**
   * Сброс всех фильтров
   */
  resetFilters() {
    this.filters_.forEach((filter: AhoRequestFilter<any>) => {
      filter.clear();
    });
  }

  /**
   * Применены ли какие-либо фильтры
   */
  isFiltersApplied(): boolean {
   let result = false;
    this.filters_.forEach((filter: AhoRequestFilter<any>) => {
      if (filter.getValue()) {
        result = true;
      }
    });
    console.log('IS FILTERS APPLIED', result);
    return result;
  }
}
