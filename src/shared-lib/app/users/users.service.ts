import { Injectable } from '@angular/core';
import { UsersResource } from './users.resource';
import {IUser} from './interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(private readonly usersResourse: UsersResource) {}


  async getAll(): Promise<IUser[]> {
    const users = await this.usersResourse.getAll();
    return users;
  }


}
