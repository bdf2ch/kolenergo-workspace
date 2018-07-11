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
      console.log(result);
      if (result) {
        this.currentUser = new User(result);
        console.log(this.currentUser);
        return this.currentUser;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Авторизация пользователя
   * @param {string} account - Учетная запись
   * @param {string} password - Пароль
   * @param addIfNotExists - Создать нового пользователя в случае если он найден в AD
   * @param appCode - Код приложения
   * @param callbacks - Массив коллбэков
   * @returns {Promise<User | null>}
   */
  async logIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string, callbacks?: Function[]): Promise<User | null> {
    try {
      const result = await this.authenticationResource.login({
        account: account,
        password: password,
        addIfNotExists: addIfNotExists,
        appCode: appCode
      });
      if (result) {
        this.currentUser = new User(result);
        if (callbacks) {
          console.log('auth callbacks', callbacks.length);
          callbacks.forEach((callback: Function) => {
            callback();
          });
        }
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
