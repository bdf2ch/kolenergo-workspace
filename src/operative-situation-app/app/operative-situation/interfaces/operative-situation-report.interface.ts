import { IUser, ICompany } from '@kolenergo/cpa';
import {IOperativeSituationConsumption} from './operative-situation-consumption.interface';
import {IWeatherSummary} from '@kolenergo/osr';

/**
 * Интерфейс, описывающий отчет об оперативной обстановке
 */
export interface IOperativeSituationReport {
  id: number;                                     // Идентификатор записи
  company: ICompany;                              // Данные об организации
  user: IUser;                                    // Данные пользователя, создавшего запись
  periodDate: string;                             // Дата сводки оперативной ситуации
  periodTime: string;                             // Время сводки оперативной ситуации
  dateCreated: number;                            // Дата создания записи
  dateChanged: number;                            // Дата изменения записи
  lep_110_150_count: number;                      // Количество отключенных ЛЭП 110-150 кВ
  lep_35_count: number;                           // Количество отключенных ЛЭП 35 кВ
  ps_110_150_count: number;                       // Количество отключенных ПС 110-150 кВ
  ps_35_count: number;                            // Количество отключенных ПС 35 кВ
  tp_6_20_count_effect_35_150: number;            // Последствие для потребителе по сети 35-150 кВ - ТП 6-20 Кв.
  population_count_effect_35_150: number;         // Последствия для потребителей по сети 35-150 кВ - население
  power_effect_35_150: number;                    // Последствия дял потребителей по сети 35-150 кВ - нагрузка
  szo_count_effect_35_150: number;                // Последствия для потребителей по сети 35-150 кВ - количество СЗО
  lep_6_20_count: number;                         // Количество отключенных ЛЭП 20 кВ
  tp_6_20_count: number;                          // Количество отключенных ТП 6-20 кВ
  population_count_effect_raspr: number;          // Последствия для потребительской распределенной сети - население
  power_effect_raspr: number;                     // Последствия для потребителей распределенной сети - нагрузка
  szo_count_effect_raspr: number;                 // Последствия для потребителей распределенной сети - количество СЗО
  weatherMin: number;                             // Минимальная температура
  weatherMax: number;                             // Максимальная температура
  weatherWind: string;                            // Ветер, м/с
  weatherPrecipitations: string;                  // Осадки
  weatherRPG: boolean;                            // Введен ли режим РПГ
  weatherORR: boolean;                            // Введен ли режим ОРР
  resourcesBrigades: number;                      // Задействованные ресурсы - количество бригад
  resourcesPeople: number;                        // Задействованные ресурсы - количество человек
  resourcesTechnics: number;                      // Задействованные ресурсы - единиц техники
  resourcesRiseCount: number;                     // Задействованные ресурсы - количество РИСЭ
  resourcesRiseSumPower: number;                  // Суммарная мощность задействованных РИСЭ
  resourcesRisePeople: number;                    // Запитано от РИСЭ - количество человек
  violations_6: number;                           // Нарушений всего 6 кВ и выше
  violations_35_uapv: number;                     // Нарушений в основной сети 35 кВ и выше - УАПВ
  violations_35_napv: number;                     // Нарушений в основной сети 35 кВ и выше - НАПВ
  violations_35_power_off: number;                // Нарушений в основной сети 35 кВ и выше - с обесточиванием
  violations_lep_rs: number;                      // Нарушений ЛЭП р/с
  violations_tn_cancel: number;                  // Технологических нарушений с погашением
  violations_04_from_6: number;                   // Нарушений в сети 0,4 кВ с 6-00
  violations_04_power_off: number;                // Отключенных на срез в сети 0,4 кВ
  violations_04_greater_3: number;                // Нарушений в сети 0,4 кВ более 3 часов
  violations_population_04_srez: number;          // Население в стеи 0,4 кВ на срез
  violations_population_04_greater_3: number;     // Население в сети 0,4 кВ более 3 часов
  // consumption: number;                            // Максимум потребления за прошедшие сутки
  consumption: IOperativeSituationConsumption;    // Максимум потребления за прошедшие сутки
  weatherSummary?: IWeatherSummary;               // Погодная сводка
}
