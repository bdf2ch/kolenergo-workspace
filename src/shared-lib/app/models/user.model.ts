import { IUser } from '../interfaces/user.interface';

export class User {
  id: number;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string | null;

  constructor(config: IUser) {
    this.id = config ? config.id : 0;
    this.firstName = config ? config.firstName : '';
    this.secondName = config ? config.secondName : '';
    this.lastName = config ? config.lastName : '';
    this.email = config ? config.email : null;
  }
}
