import { Injectable } from '@angular/core';
import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../users/models/user.model';

@Injectable()
export class AuthenticationService {
  private currentUser: User | null;
  private isLoading: boolean;

  constructor(private authenticationResource: AuthenticationResource) {
    this.currentUser = null;
  }

  /**
   * Возвращает текущего пользователя
   * @returns {User | null}
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Проверка текущей сессии
   * @returns {Promise<User | null>}
   */
  async check(appCode?: string | null): Promise<User | null> {
    try {
      const result = await this.authenticationResource.check({appCode: appCode}, null, null);
      if (result) {
        this.currentUser = new User(result);
        console.log(this.currentUser);
        return this.currentUser;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Авторизация пользователя
   * @param {string} account - Учетная запись
   * @param {string} password - Пароль
   * @returns {Promise<User | null>}
   */
  async logIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string): Promise<User | null> {
    try {
      const result = await this.authenticationResource.login({
        account: account,
        password: password,
        addIfNotExists: addIfNotExists,
        appCode: appCode
      });
      if (result) {
        this.currentUser = new User(result);
        return this.currentUser;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  async logOut(): Promise<boolean> {
    try {
      await this.authenticationResource.logout();
      this.currentUser = null;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Возвращает состояние загрузки данных
   * @returns {boolean}
   */
  loading(): boolean {
    return this.isLoading;
  }

}
