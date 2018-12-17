import { Injectable } from '@angular/core';
import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../../../control-panel-app/app/users/models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { from } from 'rxjs/observable/from';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {
  private user$: BehaviorSubject<User>;
  private currentUser: User | null;
  private loadingInProgress: BehaviorSubject<boolean>;

  constructor(private authenticationResource: AuthenticationResource) {
    this.user$ = new BehaviorSubject<User>(null);
    this.currentUser = null;
    this.loadingInProgress = new BehaviorSubject(false);
  }

  /**
   * Возвращает текущего пользователя
   * @returns {User | null}
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  user(): Observable<User> {
    return this.user$.asObservable();
  }

  /**
   * Проверка текущей сессии
   * @returns {Promise<User | null>}
   */
  async check(appCode?: string | null): Promise<User | null> {
    try {
      this.loadingInProgress.next(true);
      const result = await this.authenticationResource.check({appCode: appCode}, null, null);
      console.log(result);
      if (result) {
        this.loadingInProgress.next(false);
        this.user$.next(new User(result));
        this.currentUser = new User(result);
        console.log(this.currentUser);
        return this.currentUser;
      }
      return null;
    } catch (error) {
      console.error(error);
      this.loadingInProgress.next(false);
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
      this.loadingInProgress.next(true);
      const result = await this.authenticationResource.login({
        account: account,
        password: password,
        addIfNotExists: addIfNotExists,
        appCode: appCode
      });
      if (result) {
        this.loadingInProgress.next(false)
        this.user$.next(new User(result));
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
      this.loadingInProgress.next(false);
      return null;
    }
  }


  async logOut(): Promise<boolean> {
    try {
      this.loadingInProgress.next(true);
      await this.authenticationResource.logout();
      this.user$.next(null);
      this.currentUser = null;
      this.loadingInProgress.next(false);
      return true;
    } catch (error) {
      console.error(error);
      this.loadingInProgress.next(false);
      return false;
    }
  }

  /**
   * Возвращает состояние загрузки данных
   * @returns {Observable<boolean>>}
   */
  isLoading(): Observable<boolean> {
    return this.loadingInProgress.asObservable();
  }

}
