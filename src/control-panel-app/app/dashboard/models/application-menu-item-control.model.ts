import { IApplicationMenuItemControl } from '../interfaces/application-menu-item-control.interface';

/**
 * Класс, реализующий интерфейс элемента управления пункта меню
 */
export class ApplicationMenuItemControl implements IApplicationMenuItemControl {
  title: string;      // Текст
  icon: string;       // Иконка
  hint: string;       // Подсказка
  action: Function;   // Действие

  /**
   * Констсрктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationMenuItemControl) {
    this.title = config && config.title ? config.title : null;
    this.icon = config && config.icon ? config.icon : null;
    this.hint = config && config.hint ? config.hint : null;
    this.action = config ? config.action : null;
  }
}
