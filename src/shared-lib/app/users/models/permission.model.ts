import {IPermission} from "../interfaces/permission.interface";

export class Permission implements IPermission {
  id: number;
  code: string;
  title: string;
  isEnabled: boolean;

  constructor(config?: IPermission) {
    this.id = config ? config.id : 0;
    this.code = config ? config.code : '';
    this.title = config ? config.title : '';
    this.isEnabled = config ? config.isEnabled : false;
  }
}
