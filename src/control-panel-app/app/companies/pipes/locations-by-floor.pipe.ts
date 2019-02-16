import { Pipe, PipeTransform } from '@angular/core';
import { OfficeLocation } from '../models';
import { IFloor } from '../interfaces';

@Pipe({
  name: 'locationsByFloor'
})
export class LocationsByFloorPipe implements PipeTransform {

  transform(locations: OfficeLocation[], floor: IFloor): OfficeLocation[] {
    const result = [];
    if (locations) {
      locations.forEach((location: OfficeLocation) => {
        if (location.floor === floor.number) {
          result.push(location);
        }
      });
    }
    return result;
  }

}
