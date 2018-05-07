import { IPhone } from '../interfaces/phone.interface';

export class Phone implements IPhone {
  id: number;
  atsId: number;
  contactId: number;
  number: string;

  constructor(config?: IPhone) {
    this. id  = config && config.id ? config.id : 0;
    this.atsId = config ? config.atsId : 0;
    this.contactId = config ? config.contactId : 0;
    this.number = config ? config.number : '';
  }
}
