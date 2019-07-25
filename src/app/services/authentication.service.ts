import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private userList = {
          sanjayaddula : { userName: 'Sanjay Addula', password: 'sanjayaddula', email: 'sanjayaddula@gmail.com', mobile: '8977977443'},
          krishnat : { userName: 'Krishna Teja', password: 'krishnat', email: 'krishnat@gmail.com', mobile: '8977977444'},
          mahimay : { userName: 'Mahima Yadav', password: 'mahimay', email: 'mahimay@gmail.com', mobile: '8977977445'},
          akankshas : { userName: 'Akanksha Singh', password: 'akankshas', email: 'akankshas@gmail.com', mobile: '8977977446'},
  }

  constructor(public router: Router, private storage: Storage) {
                this.storage.get('currentUser').then((value) => {
                  this.currentUserSubject = new BehaviorSubject<User>(value);
                  this.currentUser = this.currentUserSubject.asObservable();
                });
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(userId: string, password: string) {

    const promise = new Promise((resolve, reject ) => {
      if (this.userList[userId] !== undefined) {
        console.log(this.userList[userId].password, ' : json password');
        console.log(password, ' : password');
        if (this.userList[userId].password === password) {
          const user = new User();
          user.userId = userId;
          user.userName = this.userList[userId].userName;
          user.email = this.userList[userId].email;
          user.mobile = this.userList[userId].mobile;
          this.storeUserData(user);
          resolve({status: 'success', message: 'User credentials are valid'});
        } else {
          reject({status: 'error', message: 'Invalid user credentials'});
        }

      } else {
        reject({status: 'error', message: 'Invalid user'});
      }
    });
    return promise;
  }

  logout() {
      // remove user from local storage to log user out
      this.removeUserData();
      this.router.navigate(['/login']);
  }

  async storeUserData(user: User) {
    const res = await this.storage.set('currentUser', user);
    this.currentUserSubject.next(user);
  }

  async getUserData() {
    let userData: User;
    await this.storage.get('currentUser').then((value => {
         userData = value;
         console.log('User Data 1:', userData);
    }));
    console.log('User Data 2:', userData);
    return userData;
  }

  async removeUserData() {
    await this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
  }
}
