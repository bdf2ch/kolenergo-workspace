import { Pipe, PipeTransform } from '@angular/core';
import { AhoRequestTaskContent } from '../models/aho-request-task-content.model';

@Pipe({
  name: 'taskContentByRequestType'
})
export class TaskContentByRequestTypePipe implements PipeTransform {

  transform(value: AhoRequestTaskContent[], requestTypeId?: number): AhoRequestTaskContent[] {
    if (!requestTypeId) { return value; }
    const result: AhoRequestTaskContent[] = [];
    value.forEach((taskContent: AhoRequestTaskContent) => {
      if (taskContent.requestTypeId === requestTypeId) {
        result.push(taskContent);
      }
    });
    return result;
  }

}
