import { ICompany, IUser } from '@kolenergo/lib';

/**
 * Интерфейс, описывающий отчет об оперативной обстановке
 */
export interface IOperativeSituationReport {
  id: number;                                 // Идентификатор записи
  company: ICompany;                          // Данные об организации
  user: IUser;                                // Данные пользователя, создавшего запись
  periodDate: string;                         // Дата сводки оперативной ситуации
  periodTime: string;                         // Время сводки оперативной ситуации
  dateCreated: number;                        // Дата создания записи
  dateChanged: number;                        // Дата изменения записи
  lep_110_150_count: number;                  // Количество отключенных ЛЭП 110-150 кВ
  lep_35_count: number;                       // Количество отключенных ЛЭП 35 кВ
  ps_110_150_count: number;                   // Количество отключенных ПС 110-150 кВ
  ps_35_count: number;                        // Количество отключенных ПС 35 кВ
  tp_6_20_count_effect_35_150: number;        // Последствие для потребителе по сети 35-150 кВ - ТП 6-20 Кв.
  population_count_effect_35_150: number;     // Последствия для потребителей по сети 35-150 кВ - население
  power_effect_35_150: number;                // Последствия дял потребителей по сети 35-150 кВ - нагрузка
  szo_count_effect_35_150: number;            // Последствия для потребителей по сети 35-150 кВ - количество СЗО
  lep_6_20_count: number;                     // Количество отключенных ЛЭП 20 кВ
  tp_6_20_count: number;                      // Количество отключенных ТП 6-20 кВ
  population_count_effect_raspr: number;      // Последствия для потребительской распределенной сети - население
  power_effect_raspr: number;                 // Последствия для потребителей распределенной сети - нагрузка
  szo_count_effect_raspr: number;             // Последствия для потребителей распределенной сети - количество СЗО
  weatherMin: number;                         // Минимальная температура
  weatherMax: number;                         // Максимальная температура
  weatherWind: string;                        // Ветер, м/с
  weatherPrecipitations: string;              // Осадки
  weatherRPG: boolean;                        // Введен ли режим РПГ
  weatherORR: boolean;                        // Введен ли режим ОРР
  resourcesBrigades: number;                 // Задействованные ресурсы - количество бригад
  resourcesPeople: number;                   // Задействованные ресурсы - количество человек
  resourcesTechnics: number;                 // Задействованные ресурсы - единиц техники
}
