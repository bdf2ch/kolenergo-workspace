import { Pipe, PipeTransform } from '@angular/core';
import { AhoRequest } from '../models/aho-request.model';

@Pipe({
  name: 'showCompletedRequests',
  pure: true
})
export class ShowCompletedRequestsPipe implements PipeTransform {

  transform(requests: AhoRequest[], showCompletedRequests: boolean): AhoRequest[] {
    if (showCompletedRequests === true) {
      return requests;
    } else {
      const result = [];
      requests.forEach((request: AhoRequest) => {
        if (request.status.id !== 3) {
          result.push(request);
        }
      });
      return result;
    }
  }

}
