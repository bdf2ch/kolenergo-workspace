/**
 * Decorators
 */

/**
 * Interfaces
 */

export { IMobilePhone } from '../control-panel-app/app/users/interfaces/mobile-phone.interface';
export { IServerResponse } from './app/common/interfaces/server-response.interface';
export { IPagination } from './app/common/interfaces/pagination.interface';
// export { ICompany } from '../control-panel-app/app/companies/interfaces/company.interface';
export { IDepartment } from '../control-panel-app/app/companies/interfaces/department.interface';

/**
 * Models
 */
export { Backup} from './app/common/models/backup.model';
export { MobilePhone } from '../control-panel-app/app/users/models/mobile-phone.model';
export { Pagination } from './app/common/models/pagination.model';
// export { Company } from '../control-panel-app/app/companies/models/company.model';

/**
 * Authentication module
 */
export { AuthenticationModule } from './app/authentication/authentication.module';
export { AuthenticationService } from './app/authentication/services/authentication.service';
export { AuthenticationResolveGuard } from './app/authentication/guards/authentication-resolve.guard.service';
export { CanActivateGuard } from './app/authentication/guards/can-activate.guard';
export { AuthenticationDialogComponent } from './app/authentication/components/authentication/authentication-dialog.component';

/**
 * Users module
 */
export { UsersModule } from './app/users/users.module';
export { UsersService } from './app/users/services/users.service';
export { IUser } from '../control-panel-app/app/users/interfaces/user.interface';
export { IAddUser } from '../control-panel-app/app/users/interfaces/user.add.interface';
export { IEditUser } from '../control-panel-app/app/users/interfaces/user.edit.interface';
export { IDeleteUser } from '../control-panel-app/app/users/interfaces/user.delete.interface';
export { User } from '../control-panel-app/app/users/models/user.model';
export { IPermission } from '../control-panel-app/app/users/interfaces/permission.interface';
export { IRole } from '../control-panel-app/app/users/interfaces/role.interface';
export { Permission } from '../control-panel-app/app/users/models/permission.model';
export { Role } from '../control-panel-app/app/users/models/role.model';
export { UserPermissionsManager } from '../control-panel-app/app/users/models/user-permissions-manager.model';
