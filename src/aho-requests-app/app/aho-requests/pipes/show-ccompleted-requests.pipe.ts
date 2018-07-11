import { Pipe, PipeTransform } from '@angular/core';
import { AhoRequest } from '../models/aho-request.model';

@Pipe({
  name: 'showCcmpletedRequests'
})
export class ShowCcompletedRequestsPipe implements PipeTransform {

  transform(requests: AhoRequest[], showCompletedRequests: boolean): any {
    if (showCompletedRequests) {
      return requests;
    }
    return null;
  }

}
