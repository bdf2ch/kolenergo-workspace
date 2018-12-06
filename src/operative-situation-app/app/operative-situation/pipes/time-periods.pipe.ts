import { Pipe, PipeTransform } from '@angular/core';
import { OperativeSituationReport } from '@kolenergo/osr';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'timePeriods'
})
export class TimePeriodsPipe implements PipeTransform {

  transform(value: string[], reports: Observable<OperativeSituationReport[]>): string[] {
    const result = value.slice();
    reports.subscribe((items: OperativeSituationReport[]) => {
      items.forEach((report: OperativeSituationReport) => {
        result.forEach((period: string, index: number) => {
          if (report.periodTime === period) {
            result.splice(index, 1);
          }
        });
      });
    });
    return result;
  }

}
