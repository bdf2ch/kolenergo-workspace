import { IPermission } from '../interfaces/permission.interface';
import { Permission } from './permission.model';

export class UserPermissions {
  permissions: IPermission[];

  getById(id: number): Permission | null {
    const findPermissionById = (permission: IPermission) => permission.id === id;
    const permission = this.permissions.find(findPermissionById);
    return permission ? permission : null;
  }

  getByCode(code: string): Permission | null {
    const findPermissionByCode = (permission: IPermission) => permission.code === code;
    const permission = this.permissions.find(findPermissionByCode);
    return permission ? permission : null;
  }
}
