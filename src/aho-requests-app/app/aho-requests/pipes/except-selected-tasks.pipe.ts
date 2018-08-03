import { Pipe, PipeTransform } from '@angular/core';
import { IAhoRequestTaskContent } from '../interfaces/aho-request-task-content.interface';

@Pipe({
  name: 'exceptSelectedTasks'
})
export class ExceptSelectedTasksPipe implements PipeTransform {

  transform(value: IAhoRequestTaskContent[], selected: IAhoRequestTaskContent[]): any {
    const result = value.filter((task: IAhoRequestTaskContent) => {
      const findTaskContentById = (item: IAhoRequestTaskContent) => item.id === task.id;
      const taskContent = selected.find(findTaskContentById);
      return taskContent ? false : true;
    });
    return result;
  }

}
