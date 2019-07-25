import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppUtilService } from 'src/app/services/app-util.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string;
  password: string;
  currentUser: User;
  onInit: boolean;
  constructor( private router: Router,
               private authenticationService: AuthenticationService,
               private appUtil: AppUtilService) { }

  ngOnInit() {
  this.onInit = true;
  this.checkUser();
  }

  ionViewDidEnter(): void {
    if (!this.onInit) {
      this.checkUser();
    }
  }
  checkUser() {
    this.authenticationService.getUserData()
    .then((data) => {
      console.log('init then ', data);
      this.currentUser = data;
      this.userName = this.currentUser.userId;
    })
    .catch((error) => {
      console.log('init error ', error);
      this.currentUser = undefined;
      this.userName = undefined;
      this.password = undefined;
    });
  }

  login() {

    if (!this.userName && !this.password) {
      this.appUtil.showAlert('Error!', 'Please enter username and password');
    } else if (!this.userName) {
      this.appUtil.showAlert('Error!', 'Please enter username');
    }  else if (!this.password) {
      this.appUtil.showAlert('Error!', 'Please enter password');
    }
    const promise =  this.authenticationService.login(this.userName, this.password);
    promise.then((response: any) => {
      if (response.status !== undefined && response.status === 'success') {
        this.onInit = false; 
        this.router.navigate(['/home/dashboard']);

      } else {
        this.appUtil.showAlert('Error!', 'Error while authenticating the user');
      }
   }).catch((error) => {
    if (error.status !== undefined && error.status === 'error') {
      this.appUtil.showAlert('Error!', error.message);
   } else {
    this.appUtil.showAlert('Error!', 'Error while authenticating the user');
   }
   });
  }

  loginWithFingerprint() {

    if (this.appUtil.isFingerprintAvailable) {
      this.appUtil.presentFingerPrint()
      .then((result: any) => {
        this.router.navigate(['/home/dashboard']);
      })
      .catch((error: any) => {
        console.error('fingerprint : ', 'error');
      });
    }

  }
}
