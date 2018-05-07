import { IUser } from '../../../../shared-lib/shared/interfaces/user.interface';
import { IPhone } from './phone.interface';
import { Phone } from '../models/phone.model';

export interface IContact extends IUser {
  officeId?: number;
  photo?: string;
  room?: string;
  order?: number;
  isInFavorites: boolean;
  phones?: IPhone[] | Phone[];
}
