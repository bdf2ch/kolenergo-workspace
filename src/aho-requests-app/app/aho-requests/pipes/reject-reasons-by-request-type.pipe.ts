import { Pipe, PipeTransform } from '@angular/core';
import { AhoRequestRejectReason } from '../models/aho-request-reject-reason.model';
import { AhoRequestType } from '../models/aho-request-type.model';

@Pipe({
  name: 'rejectReasonsByRequestType'
})
export class RejectReasonsByRequestTypePipe implements PipeTransform {

  transform(value: AhoRequestRejectReason[], requestType: AhoRequestType): any {
    const result = [];
    value.forEach((reason: AhoRequestRejectReason) => {
      if (reason.requestTypeId === requestType.id) {
        result.push(reason);
      }
    });
    return result;
  }
}
