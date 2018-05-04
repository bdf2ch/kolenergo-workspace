import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable()
export class AuthenticationService {
  private currentUser: User | null;
  private isLoading: boolean;

  constructor() {
    this.currentUser = null;
  }

  /**
   * Возвращает состояние загрузки данных
   * @returns {boolean}
   */
  loading(): boolean {
    return this.isLoading;
  }

  signIn(account, password): Promise<any> {

  }

}
