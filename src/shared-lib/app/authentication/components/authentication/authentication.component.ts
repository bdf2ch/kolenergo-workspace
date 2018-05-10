import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationComponent implements OnInit {
  public authForm: FormGroup;
  public authData: any = {
    account: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder,
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


  async submit(): Promise<any> {
    const result = await this.authenticationService.logIn(this.authData.account, this.authData.password);
    console.log(result);
  }

}
