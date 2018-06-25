import { Pipe, PipeTransform } from '@angular/core';
import { IAhoRequestNeed } from '../interfaces/aho-request-need.interface';

@Pipe({
  name: 'needs'
})
export class NeedsByRequestTypeIdPipe implements PipeTransform {

  transform(value: IAhoRequestNeed[], requestTypeId?: number): any {
    if (!requestTypeId) {
      return value;
    }
    const result = [];
    value.forEach((item: IAhoRequestNeed) => {
      if (item.content.requestTypeId === requestTypeId) {
        result.push(item);
      }
    });
    return result;
  }

}
