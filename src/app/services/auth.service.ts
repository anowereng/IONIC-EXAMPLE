
import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';
 
const TOKEN_KEY = 'access_token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
 
  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private toastService:ToastService) {
    this.plt.ready().then(() => {
      this.checkToken();
      console.log('checkToken()=>'+this.authenticationState.value);
    });
  }
 
  checkToken() {

    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
      
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
           this.storage.remove(TOKEN_KEY);
          // this.storage.remove(TOKEN_KEY).then(() => {
          //   this.authenticationState.next(false);
          // });
        }
      }
    });

  }
 
  register(credentials) {
    return this.http.post(`${this.url}/login/register`, credentials).pipe(
      catchError(e => {
        this.toastService.message(e.error.msg);
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    return this.http.post(`${this.url}/login/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
           console.log(this.helper.decodeToken(res['token']))
           console.log(res['token'])
          // console.log(this.authenticationState.value)
        }),
        catchError(e => {
          this.toastService.message(e);
          throw new Error(e);
        })
      );
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.toastService.message('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }
 
  isAuthenticated() {

    return this.authenticationState.value;
  }
 
  // showAlert(msg) {
  //   let alert = this.alertController.create({
  //     message: msg,
  //     header: 'Error',
  //     buttons: ['OK']
  //   });
  //   alert.then(alert => alert.present());
  // }
}