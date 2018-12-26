/**
 * Интерфейс, описывающий элемент управления, содержащийся пункте меню
 */
export interface IApplicationMenuItemControl {
  title?: string;     // Текст элемента управления
  icon?: string;      // Иконка
  hint?: string;      // Подсказка
  action: Function;   // Функция, которая будет выполнена при нажатии
}
