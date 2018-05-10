import { Injectable } from '@angular/core';
import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../shared/models/user.model';

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
  async check(): Promise<User | null> {
    try {
      const result = await this.authenticationResource.check();
      if (result) {
        this.currentUser = new User(result);
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
  async logIn(account: string, password: string): Promise<User | null> {
    try {
      const result = await this.authenticationResource.login({account: account, password: password});
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
      return false;
    } catch (error) {
      console.error(error);
      return true;
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
