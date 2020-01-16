import { IDivision } from '../interfaces/division.interface';

/**
 * Класс, реализующий интерфейс структурного подразделения
 */
export class Division implements IDivision {
  id: number;             // Идентификатор
  parentId: number;       // Идентификатор структурного подраздкеления верхнего уровня
  companyId: number;      // Идентификатор организации
  title: string;          // Наименование
  children: Division[];   // Дочерние структурные подразделения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDivision) {
    this.id = config ? config.id : null;
    this.parentId = config ? config.parentId : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
    this.children = [];
  }
}
