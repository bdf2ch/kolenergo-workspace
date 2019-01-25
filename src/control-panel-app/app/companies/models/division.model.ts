import { IDivision } from '../interfaces/division.interface';
import { Backup } from '../../basic/models/backup.model';

/**
 * Класс, ркализующий интерфейс структурного подразделнния организации
 */
export class Division extends Backup implements IDivision {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор организации
  parentId: number;       // Идентификатор структурного подразделдения верхнего уровня
  title: string;          // Наименование
  order: number;          // Порядок следования
  children: Division[];   // Структурные подразделения нижнего уровня

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDivision) {
    super();
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.parentId = config ? config.parentId : null;
    this.title = config ? config.title : null;
    this.order = config ? config.order : 0;
    this.children = [];
  }
}
