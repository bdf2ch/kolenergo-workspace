import { Pipe, PipeTransform } from '@angular/core';
import { Department, Office } from '../models';

@Pipe({
  name: 'officesByDepartment'
})
export class OfficesByDepartmentPipe implements PipeTransform {

  transform(offices: Office[], department: Department): any {
    const result = [];
    offices.forEach((office: Office) => {
      if (office.departmentId === department.id) {
        result.push(office);
      }
    });
    return result;
  }
}
