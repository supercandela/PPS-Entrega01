import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AlertController, LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate (email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Ingresando, aguarde unos instantes...' })
      .then(loadingEl => {
        loadingEl.present();

        let authObs: Observable<AuthResponseData>;

        //Chequea si el usuario se quiere loguear o si quiere crear una nueva cuenta y hace el llamado a la api según lo que necesita
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/recipes');
          }, errorRes => {
            loadingEl.dismiss();
            const code = errorRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            //Chequea el error y sobre escribe el mensaje que se muestra al usuario
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could bot be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'The password is not correct.';
            } else if (code === 'INVALID_LOGIN_CREDENTIALS') {
              message = 'E-Mail address or password is not correct. Please, enter them again.'
            }
            this.showAlert(message);
          });
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(authform: NgForm) {
    if (!authform.valid) {
      return;
    }

    const email = authform.value.email;
    const password = authform.value.password;

    this.authenticate(email, password);
  }

  private showAlert (message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

  onFastLogin (authform: NgForm, email: string, password: string) {
    authform.controls['email'].setValue(email);
    authform.controls['password'].setValue(password);
  }
}
