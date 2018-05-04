import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationComponent implements OnInit {
  public account: FormControl = new FormControl('', Validators.required);
  public password: FormControl = new FormControl('', Validators.required);

  constructor(public authentication: AuthenticationService) { }

  ngOnInit() { }


  /**
   * Возвращает сообщение об ошибке для поля ввода учетной записи
   * @returns {string}
   */
  getAccountErrorMessage(): string {
    return this.account.hasError('required') ? 'Вы не ввели учетную запись' : '';
  }


  /**
   * Возвращает сообщение об ошибке для поля ввода пароля
   * @returns {string}
   */
  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'Вы не ввели пароль' : '';
  }


  submit(): void {}

}
