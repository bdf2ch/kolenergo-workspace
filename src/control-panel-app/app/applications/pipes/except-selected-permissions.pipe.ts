import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../../users/models/permission.model';

@Pipe({
  name: 'exceptSelectedPermissions',
  pure: false
})
export class ExceptSelectedPermissionsPipe implements PipeTransform {

  transform(value: Permission[], selected?: Permission[]): Permission[] {
    const result = value.filter((permission: Permission) => {
      const findPermissionById = (item: Permission) => item.id === permission.id;
      const permissionFound = selected.find(findPermissionById);
      return permissionFound ? false : true;
    });
    return result;
  }

}
