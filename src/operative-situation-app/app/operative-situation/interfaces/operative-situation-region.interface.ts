/**
 * Интерфейс, описывающий географический регион организации
 */
export interface IOperativeSituationRegion {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор организации
  zoom: number;           // Масштаб карты
  leftBottomPosition: {   // Координаты левого нижнего угла региона
    x: number,          // Широта
    y: number           // Долгота
  };
  rightTopPosition: {     // Координаты правого верхнего угла региона
    x: number,          // Широта
    y: number           // Долгота
  };
}
