import { Injectable } from '@angular/core';
import { UsersResource } from '../resources/users.resource';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(private readonly usersResource: UsersResource) {}


  async getAll(): Promise<IUser[]> {
    const users = await this.usersResource.getAll();
    return users;
  }


  /**
   * Получение пользователей, задействованных в приложении
   * @param {string} appCode - Код приложения
   * @returns {Promise<IUser[] | null>}
   */
  async getByAppCode(appCode: string): Promise<User[] | null> {
    try {
      const result = await this.usersResource.getAll(null, {appCode: appCode}, null);
      if (result) {
        const users = [];
        result.forEach((item: IUser) => {
          const user = new User(item);
          users.push(user);
        });
        return users;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
