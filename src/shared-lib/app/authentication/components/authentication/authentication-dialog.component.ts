import {Component, Inject, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationDialogComponent implements OnInit {
  public authForm: FormGroup;
  public authData: any = {
    account: 'kolu0897',
    password: 'zx12!@#$'
  };

  constructor(private dialog: MatDialogRef<AuthenticationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public callbacks: Function[],
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public authenticationService: AuthenticationService) {
    this.authForm = this.formBuilder.group({
      account: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }


  /**
   * Возвращает сообщение об ошибке для поля ввода учетной записи
   * @returns {string}
   */
  getAccountErrorMessage(): string {
    return this.authForm.get('account').hasError('required') ? 'Вы не ввели учетную запись' : '';
  }


  /**
   * Возвращает сообщение об ошибке для поля ввода пароля
   * @returns {string}
   */
  getPasswordErrorMessage(): string {
    return this.authForm.get('password').hasError('required') ? 'Вы не ввели пароль' : '';
  }


  /**
   * Отправка данных формы
   * @returns {Promise<any>}
   */
  async submit(): Promise<any> {
    const result = await this.authenticationService.logIn(
      this.authData.account,
      this.authData.password,
      true,
      window.localStorage && window.localStorage.getItem('app_code') ? window.localStorage.getItem('app_code') : null,
      this.callbacks ? this.callbacks : undefined
    );
    if (result) {
      this.dialog.close();
    } else {
      this.snackBar.open('Пользователь не найден', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
    console.log(result);
  }

}
