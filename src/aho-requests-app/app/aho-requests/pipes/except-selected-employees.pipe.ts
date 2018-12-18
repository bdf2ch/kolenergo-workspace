import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@kolenergo/cpa';
import { AhoRequest } from '../models/aho-request.model';

@Pipe({
  name: 'exceptSelectedEmployees',
  pure: false
})
export class ExceptSelectedEmployeesPipe implements PipeTransform {

  transform(value: User[], request: AhoRequest): any {
    const result = [];
    value.forEach((item: User) => {
      const findEmployeeById = (employee: User) => employee.id === item.id;
      const found = request.employees.find(findEmployeeById);
      if (!found) {
        result.push(item);
      }
    });
    return result;
  }

}
