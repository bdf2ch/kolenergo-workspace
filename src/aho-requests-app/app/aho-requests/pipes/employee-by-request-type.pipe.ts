import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@kolenergo/cpa';
import { AhoRequestType } from '../models/aho-request-type.model';

@Pipe({
  name: 'employeeByRequestType'
})
export class EmployeeByRequestTypePipe implements PipeTransform {

  transform(value: User[], requestType?: AhoRequestType): any {
    const result = [];
    if (!requestType) {
      console.log('no type');
      return value;
    }
    value.forEach((employee: User) => {
      switch (requestType.id) {
        case 1:
          if (employee.permissions.getRoleById(5)) {
            result.push(employee);
          }
          break;
        case 2:
          if (employee.permissions.getRoleById(3)) {
            result.push(employee);
          }
          break;
        case 3:
          if (employee.permissions.getRoleById(2)) {
            result.push(employee);
          }
          break;
        case 8:
          if (employee.permissions.getRoleById(4)) {
            result.push(employee);
          }
          break;
        case 10:
          if (employee.permissions.getRoleById(6)) {
            result.push(employee);
          }
          break;
      }
    });
    return result;
  }

}
