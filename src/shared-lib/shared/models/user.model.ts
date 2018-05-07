import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  id: number;
  divisionId: number;
  firstName: string;
  secondName: string;
  lastName: string;
  position: string;
  email: string;
  activeDirectoryAccount: string;

  constructor(config: IUser) {
    this.id = config && config.id ? config.id : 0;
    this.divisionId = config && config.divisionId ? config.divisionId : 0;
    this.firstName = config ? config.firstName : '';
    this.secondName = config ? config.secondName : '';
    this.lastName = config ? config.lastName : '';
    this.position = config ? config.position : '';
    this.email = config ? config.email : '';
    this.activeDirectoryAccount = config && config.activeDirectoryAccount ? config.activeDirectoryAccount : '';
  }
}
