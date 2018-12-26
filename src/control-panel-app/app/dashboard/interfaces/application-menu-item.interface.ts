import { ApplicationMenuItemControl } from '../models/application-menu-item-control.model';
import {IApplicationMenuItemControl} from './application-menu-item-control.interface';


/**
 * Интерфейс, описывающий элемент меню приложения
 */
export interface IApplicationMenuItem {
  id: string;                 // Идентификатор
  title: string;              // Наименование
  link?: string;              // Ссылка
  icon: string;               // Иконка
  isSelected?: boolean;       // Является ли текущим
  isButtonEnabled?: boolean;  //
  action?: string;
  buttons?: IApplicationMenuItemControl[];    // Массив элементов управления пункта меню
}
