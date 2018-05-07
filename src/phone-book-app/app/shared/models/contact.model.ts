import { IContact } from '../interfaces/contact.interface';
import { User } from '../../../../shared-lib/shared/models/user.model';
import { IPhone } from '../interfaces/phone.interface';
import { Phone } from './phone.model';

export class Contact extends User implements IContact {
  officeId: number;
  photo: string;
  room: string;
  order: number;
  isInFavorites: boolean;
  phones: Phone[];


  constructor(config?: IContact) {
    super(config);
    this.officeId = config && config.officeId ? config.officeId : 0;
    this.photo = config && config.photo ? config.photo : '';
    this.room = config && config.room ? config.room : '';
    this.order = config && config ? config.order : 0;
    this.isInFavorites = config && config.isInFavorites ? config.isInFavorites : false;

    if (config && config.phones) {
      config.phones.forEach((item: IPhone, index: number, array: IPhone[]) => {});
    }
  }
}
